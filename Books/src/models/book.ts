import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface BookProps {
	title: string;
	author: string;
	edition?: string;
	price: number;
	userId: string;
}

interface BookDoc extends mongoose.Document {
	title: string;
	author: string;
	edition?: string;
	price: number;
	userId: string;
	version: number;
}

interface BookModel extends mongoose.Model<BookDoc> {
	build(props: BookProps): BookDoc;
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
		edition: {
			type: String,
		},
		price: {
			type: Number,
			required: true,
		},
		userId: {
			type: String,
			required: true,
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

bookSchema.statics.build = (props: BookProps) => {
	return new Book(props);
};

const Book = mongoose.model<BookDoc, BookModel>("Book", bookSchema);

export { Book };
