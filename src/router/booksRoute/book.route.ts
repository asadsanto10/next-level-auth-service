/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import {
	addNewBook,
	featuredBook,
	searchBook,
	updatePrice,
} from '../../controller/booksController.ts/books.controller';

const router = express.Router();

router.get('/', (req, res) => {
	res.json('Hello world');
});

router.post('/addBook', addNewBook);
router.get('/search', searchBook);
router.get('/featured', featuredBook);
router.put('/update-price', updatePrice);

export default router;
