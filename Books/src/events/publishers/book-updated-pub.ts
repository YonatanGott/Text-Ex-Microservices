import { Publisher, Subjects, BookUpdatedEvent } from "@keshetanan/common";

export class BookUpdatedPublisher extends Publisher<BookUpdatedEvent> {
	subject: Subjects.BookUpdated = Subjects.BookUpdated;
}
