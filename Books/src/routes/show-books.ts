import express, { Request, Response } from "express";
import { NotFoundError } from "@keshetanan/common";
import { Book } from "../models/book";

const router = express.Router();

router.get("/api/books/:id", async (req: Request, res: Response) => {
	const book = await Book.findById(req.params.id);

	if (!book) {
		throw new NotFoundError();
	}

	res.send(book);
});

export { router as showBookRouter };
