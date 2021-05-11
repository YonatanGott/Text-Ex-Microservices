import { Subjects } from "./subjects";

export interface BookUpdatedEvent {
	subject: Subjects.BookUpdated;
	data: {
		id: string;
		title: string;
		author: string;
		edition?: string;
		price: number;
		userId: string;
		version: number;
		orderId?: string;
	};
}
