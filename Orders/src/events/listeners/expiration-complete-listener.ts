import {
	ExpirationCompleteEvent,
	Listener,
	OrderStatus,
	Subjects,
} from "@keshetanan/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
import { queueGroupName } from "./queue-group-name";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
	subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
	queueGroupName = queueGroupName;

	async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
		const order = await Order.findById(data.orderId).populate("book");

		if (!order) {
			throw new Error("Order Not Found");
		}
		if (order.status === OrderStatus.Complete) {
			return msg.ack();
		}

		order.set({
			status: OrderStatus.Cancelled,
		});

		await order.save();

		await new OrderCancelledPublisher(this.client).publish({
			id: order.id,
			version: order.version,
			book: {
				id: order.book.id,
			},
		});

		msg.ack();
	}
}
