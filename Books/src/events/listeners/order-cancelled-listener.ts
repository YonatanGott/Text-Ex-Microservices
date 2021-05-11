import { Listener, OrderCancelledEvent, Subjects } from "@keshetanan/common";
import { Message } from "node-nats-streaming";
import { Book } from "../../models/book";
import { BookUpdatedPublisher } from "../publishers/book-updated-pub";
import { queueGroupName } from "./queue-group-name";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
	subject: Subjects.OrderCancelled = Subjects.OrderCancelled;

	queueGroupName = queueGroupName;

	async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
		const book = await Book.findById(data.book.id);

		if (!book) {
			throw new Error("Book Not Found");
		}

		book.set({ orderId: undefined });
		await book.save();

		await new BookUpdatedPublisher(this.client).publish({
			id: book.id,
			title: book.title,
			author: book.author,
			edition: book.edition,
			price: book.price,
			userId: book.userId,
			orderId: book.orderId,
			version: book.version,
		});

		msg.ack();
	}
}
