import { Subjects } from "./subjects";

export interface BookCreatedEvent {
	subject: Subjects.BookCreated;
	data: {
		id: string;
		title: string;
		author: string;
		edition?: string;
		price: number;
		userId: string;
		version: number;
	};
}
