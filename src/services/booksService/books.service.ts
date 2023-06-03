import {
	IBook,
	IBookMakeSearchObject,
	IBookQuery,
} from '../../interface/booksInterface/books.interface';
import Book from '../../models/booksModel/books.model';

export const addNewBookToDB = async (bookData: IBook): Promise<IBook> => {
	const book = new Book(bookData);
	await book.save();
	return bookData;
};

export const searchBookToDB = async (query: IBookQuery): Promise<IBook[]> => {
	const makeSearchObject: IBookMakeSearchObject = { genre: query.genre };

	if (query.publishedBy) {
		makeSearchObject['publisher.name'] = query.publishedBy;
	}

	const searchBook = Book.find(makeSearchObject);
	return searchBook;
};

export const getFeaturedBookToDB = async (): Promise<IBook | null> => {
	const featuredBook = Book.getBookFeatured();
	return featuredBook;
};

export const updateBookPriceToDb = async () => {
	const updateBookPrice = Book.aggregate([
		{
			$match: {
				price: { $type: 'string' },
				publicationYear: { $gt: 2020 },
			},
		},
		{
			$set: {
				price: {
					$toInt: '$price',
				},
			},
		},
		{
			$merge: { into: 'books' },
		},
	]);
	return updateBookPrice;
};
