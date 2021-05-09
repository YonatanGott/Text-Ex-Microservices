import mongoose from "mongoose";
import express, { Request, Response } from "express";
import {
	requireAuth,
	validateRequest,
	NotFoundError,
	OrderStatus,
	BadRequestError,
} from "@keshetanan/common";
import { body } from "express-validator";
import { Book } from "../models/book";
import { Order } from "../models/order";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 10 * 60;

router.post(
	"/api/orders",
	requireAuth,
	[
		body("bookId")
			.not()
			.isEmpty()
			.custom((input: string) => mongoose.Types.ObjectId.isValid(input))
			.withMessage("BookId must be provided"),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { bookId } = req.body;

		// Find the book the user is trying to order in the database
		const book = await Book.findById(bookId);
		if (!book) {
			throw new NotFoundError();
		}

		// Make sure that this book is not already reserved
		const isReserved = await book.isReserved();
		if (isReserved) {
			throw new BadRequestError("Book is already reserved");
		}

		// Calculate an expiration date for this order
		const expiration = new Date();
		expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

		// Build the order and save it to the database
		const order = Order.build({
			userId: req.currentUser!.id,
			status: OrderStatus.Created,
			expiresAt: expiration,
			book,
		});
		await order.save();

		// Publish an event saying that an order was created
		new OrderCreatedPublisher(natsWrapper.client).publish({
			id: order.id,
			version: order.version,
			status: order.status,
			userId: order.userId,
			expiresAt: order.expiresAt.toISOString(),
			book: {
				id: book.id,
				price: book.price,
			},
		});

		res.status(201).send(order);
	}
);

export { router as newOrderRouter };
