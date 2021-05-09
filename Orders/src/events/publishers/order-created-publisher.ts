import { Publisher, OrderCreatedEvent, Subjects } from "@keshetanan/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
	subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
