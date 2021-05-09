import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { BookCreatedListener } from "./events/listeners/book-created-listener";
import { BookUpdatedListener } from "./events/listeners/book-updated-listener";

const start = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error("JWT Key not found");
	}
	if (!process.env.MONGO_URI) {
		throw new Error("MONGO_URI not found");
	}
	if (!process.env.NATS_CLIENT_ID) {
		throw new Error("NATS_CLIENT_ID not found");
	}
	if (!process.env.NATS_CLUSTER_ID) {
		throw new Error("NATS_CLUSTER_ID not found");
	}
	if (!process.env.NATS_URL) {
		throw new Error("NATS_URL not found");
	}
	try {
		await natsWrapper.connect(
			process.env.NATS_CLUSTER_ID,
			process.env.NATS_CLIENT_ID,
			process.env.NATS_URL
		);
		natsWrapper.client.on("close", () => {
			console.log("NATS Closed");
			process.exit();
		});
		process.on("SIGINT", () => natsWrapper.client.close());
		process.on("SIGTERM", () => natsWrapper.client.close());

		new BookCreatedListener(natsWrapper.client).listen();
		new BookUpdatedListener(natsWrapper.client).listen();

		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log("Connected to MongoDB Orders");
	} catch (error) {
		console.error(error);
	}
	app.listen(3000, () => {
		console.log("Listening on port 3000");
	});
};

start();
