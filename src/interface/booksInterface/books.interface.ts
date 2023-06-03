import { HydratedDocument, Model } from 'mongoose';

export interface IBook {
	title: string;
	author: Array<string>;
	genre: string;
	publicationYear: number;
	rating: number;
	price: number;
	publisher: {
		name: string;
		location: string;
	};
	reviews: Array<{
		user: string;
		comment: string;
	}>;
	featured?: string;
}

export interface IBookQuery {
	genre: string;
	publishedBy?: string;
}
export interface IBookMakeSearchObject {
	genre: string;
	'publisher.name'?: string;
}

export interface IGetBookFeaturedMethod extends Model<IBook> {
	bookFeatured(): Array<IBook>;
}

export interface GetBookFeaturedModal extends Model<IBook, {}, IGetBookFeaturedMethod> {
	getBookFeatured(): Promise<HydratedDocument<IBook, IGetBookFeaturedMethod>>;
}
