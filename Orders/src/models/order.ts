import mongoose from "mongoose";
import { OrderStatus } from "@keshetanan/common";
import { BookDoc } from "./book";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export { OrderStatus };

interface OrderProps {
	userId: string;
	status: OrderStatus;
	expiresAt: Date;
	book: BookDoc;
}

interface OrderDoc extends mongoose.Document {
	userId: string;
	status: OrderStatus;
	expiresAt: Date;
	book: BookDoc;
	version: number;
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
		expiresAt: {
			type: mongoose.Schema.Types.Date,
		},
		book: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book",
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
	return new Order(props);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
