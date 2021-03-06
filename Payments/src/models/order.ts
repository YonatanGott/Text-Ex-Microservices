import mongoose from "mongoose";
import { OrderStatus } from "@keshetanan/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export { OrderStatus };

interface OrderProps {
	id: string;
	version: number;
	price: number;
	userId: string;
	status: OrderStatus;
}

interface OrderDoc extends mongoose.Document {
	version: number;
	price: number;
	userId: string;
	status: OrderStatus;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
	build(props: OrderProps): OrderDoc;
}

const orderSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
			enum: Object.values(OrderStatus),
			default: OrderStatus.Created,
		},
		price: {
			type: Number,
			require: true,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
			},
		},
	}
);

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (props: OrderProps) => {
	return new Order({
		_id: props.id,
		version: props.version,
		price: props.price,
		userId: props.userId,
		status: props.status,
	});
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
