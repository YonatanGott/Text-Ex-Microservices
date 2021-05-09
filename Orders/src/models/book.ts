import mongoose from "mongoose";
import { Order, OrderStatus } from "./order";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface BookProps {
	id: string;
	title: string;
	author: string;
	price: number;
}

interface BookDoc extends mongoose.Document {
	title: string;
	author: string;
	price: number;
	version: number;
	isReserved(): Promise<boolean>;
}

interface BookModel extends mongoose.Model<BookDoc> {
	build(props: BookProps): BookDoc;
	findByEvent(event: { id: string; version: number }): Promise<BookDoc | null>;
}

const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
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

bookSchema.set("versionKey", "version");
bookSchema.plugin(updateIfCurrentPlugin);

bookSchema.statics.findByEvent = (event: { id: string; version: number }) => {
	return Book.findOne({
		_id: event.id,
		version: event.version - 1,
	});
};

bookSchema.statics.build = (props: BookProps) => {
	return new Book({
		_id: props.id,
		title: props.title,
		author: props.author,
		price: props.price,
	});
};
bookSchema.methods.isReserved = async function () {
	// this === the book document that we just called 'isReserved' on
	const existingOrder = await Order.findOne({
		book: this.id, // Book id,
		status: {
			$in: [
				OrderStatus.Created,
				OrderStatus.AwaitingPayment,
				OrderStatus.Complete,
			],
		},
	});

	return !!existingOrder;
};

const Book = mongoose.model<BookDoc, BookModel>("Book", bookSchema);

export { Book, BookDoc };
