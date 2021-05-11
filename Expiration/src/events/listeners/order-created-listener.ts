import { Listener, OrderCreatedEvent, Subjects } from "@keshetanan/common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queues";
import { queueGroupName } from "./queue-group-name";

export class OrderCreeatedListener extends Listener<OrderCreatedEvent> {
	subject: Subjects.OrderCreated = Subjects.OrderCreated;

	queueGroupName = queueGroupName;

	async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
		const delay = new Date(data.expiresAt).getTime() - new Date().getTime();

		await expirationQueue.add(
			{
				orderId: data.id,
			},
			{
				delay: delay,
			}
		);

		msg.ack();
	}
}
