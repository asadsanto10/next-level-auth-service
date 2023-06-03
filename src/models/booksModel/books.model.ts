import { Schema, model } from 'mongoose';
import {
	GetBookFeaturedModal,
	IBook,
	IGetBookFeaturedMethod,
} from '../../interface/booksInterface/books.interface';

const bookSchema = new Schema<IBook, IGetBookFeaturedMethod>({
	title: { type: String, required: true },
	author: [{ type: String, required: true }],
	genre: { type: String, required: true },
	publicationYear: { type: Number, required: true },
	rating: { type: Number, required: true },
	price: { type: Number, required: true },
	publisher: {
		name: { type: String, required: true },
		location: { type: String, required: true },
	},
	reviews: [
		{
			user: { type: String, required: true },
			comment: { type: String, required: true },
		},
	],
});

bookSchema.static('getBookFeatured', async function getBookFeatured() {
	const featuredBook: Array<IBook> = await this.aggregate([
		{ $match: { rating: { $gte: 4 } } },
		{
			$addFields: {
				featured: {
					$switch: {
						branches: [
							{
								case: {
									$and: [{ $gte: ['$rating', 4] }, { $lte: ['$rating', 4.5] }],
								},
								then: 'Popular',
							},
							{
								case: {
									$gt: ['$rating', 4.5],
								},
								then: 'Best Seller',
							},
						],
						default: 'low rating',
					},
				},
			},
		},
		{ $project: { __v: 0 } },
	]);
	return featuredBook;
});

const Book = model<IBook, GetBookFeaturedModal>('Book', bookSchema);

export default Book;
