import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
// Routes
import { createChargeRouter } from "./routes/new";
// Middlewares
// Errors
import { errorHandler, NotFoundError, currentUser } from "@keshetanan/common";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: true,
	})
);
app.use(currentUser);

app.use(createChargeRouter);
// app.use(showBookRouter);
// app.use(indexBookRouter);
// app.use(updateBookRouter);

app.all("*", async () => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
