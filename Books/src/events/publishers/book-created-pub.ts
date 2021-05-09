import { Publisher, Subjects, BookCreatedEvent } from "@keshetanan/common";

export class BookCreatedPublisher extends Publisher<BookCreatedEvent> {
	subject: Subjects.BookCreated = Subjects.BookCreated;
}
