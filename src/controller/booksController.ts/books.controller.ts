import { Request, Response } from 'express';
import { IBook, IBookQuery } from '../../interface/booksInterface/books.interface';
import {
	addNewBookToDB,
	getFeaturedBookToDB,
	searchBookToDB,
	updateBookPriceToDb,
} from '../../services/booksService/books.service';

export const addNewBook = async (req: Request, res: Response) => {
	try {
		const bookData = req.body as IBook;

		const book = await addNewBookToDB(bookData);

		res.status(200).json({
			status: 'success',
			message: 'Book add successfully',
			data: book,
		});
	} catch (error) {
		console.log(error);
		res.json(error);
	}
};

export const searchBook = async (req: Request, res: Response) => {
	try {
		const searchQuery = req.query as unknown as IBookQuery;

		const book = await searchBookToDB(searchQuery);

		res.status(200).json({
			status: 'success',
			message: book?.length > 0 ? 'Book fetch successfully' : 'Book not found',
			data: book,
		});
	} catch (error) {
		console.log(error);
		res.json(error);
	}
};

export const featuredBook = async (req: Request, res: Response) => {
	try {
		const book = await getFeaturedBookToDB();
		res.status(200).json({
			status: 'success',
			message: 'Book fetch successfully',
			data: book,
		});
	} catch (error) {
		console.log(error);
		res.json(error);
	}
};

export const updatePrice = async (req: Request, res: Response) => {
	try {
		await updateBookPriceToDb();
		res.status(200).json({
			status: 'success',
			message: 'Book price update successfully',
		});
	} catch (error) {
		console.log(error);
		res.json(error);
	}
};
