import { Listener, OrderCreatedEvent, Subjects } from "@keshetanan/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Book } from "../../models/book";
import { BookUpdatedPublisher } from "../publishers/book-updated-pub";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
	subject: Subjects.OrderCreated = Subjects.OrderCreated;

	queueGroupName = queueGroupName;

	async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
		const book = await Book.findById(data.book.id);

		if (!book) {
			throw new Error("Book not Found");
		}

		book.set({ orderId: data.id });

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
