import { Subjects, Publisher, OrderCancelledEvent } from "@keshetanan/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
	subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
