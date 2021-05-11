import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
	validateRequest,
	NotFoundError,
	requireAuth,
	NotAuthorizedError,
	BadRequestError,
} from "@keshetanan/common";
import { Book } from "../models/book";
import { BookUpdatedPublisher } from "../events/publishers/book-updated-pub";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.put(
	"/api/books/:id",
	requireAuth,
	[
		body("title").not().isEmpty().withMessage("Title is required"),
		body("author").not().isEmpty().withMessage("Author is required"),
		body("price")
			.isFloat({ gt: 0 })
			.withMessage("Price must be provided and must be greater than 0"),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const book = await Book.findById(req.params.id);

		if (!book) {
			throw new NotFoundError();
		}

		if (book.orderId) {
			throw new BadRequestError("Book is reserved");
		}

		if (book.userId !== req.currentUser!.id) {
			throw new NotAuthorizedError();
		}

		book.set({
			title: req.body.title,
			author: req.body.author,
			edition: req.body.edition,
			price: req.body.price,
		});
		await book.save();
		new BookUpdatedPublisher(natsWrapper.client).publish({
			id: book.id,
			title: book.title,
			author: book.author,
			edition: book.edition,
			price: book.price,
			userId: book.userId,
			version: book.version,
		});

		res.send(book);
	}
);

export { router as updateBookRouter };
