/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextFunction, Request, Response } from 'express';
import variable from '../../../config';
import ApiError from '../../../errors/apiError';
import validationErrorHandler from '../../../errors/validationErrorHandler';
import { IGenericErrorMessage } from '../../../interface/error.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
	res.status(400).json({ error });

	let statusCode = 500;
	let message: string | null = 'something went wrong!';
	let errorMessage: IGenericErrorMessage[] = [];

	if (error?.name === 'ValidationError') {
		const validationError = validationErrorHandler(error);
		statusCode = validationError?.statusCode;
		message = validationError?.message;
		errorMessage = validationError?.errorMessage;
	} else if (error instanceof ApiError) {
		statusCode = error?.statusCode;
		message = error.message;
		errorMessage = error?.message
			? [
					{
						path: '',
						message: error?.message,
					},
			  ]
			: [];
	} else if (error instanceof Error) {
		message = error?.message;
		errorMessage = error?.message
			? [
					{
						path: '',
						message: error?.message,
					},
			  ]
			: [];
	}

	res.status(statusCode).json({
		status: false,
		message,
		errorMessage,
		stack: variable.nodeENV !== 'production' ? error?.stake : undefined,
	});

	next();
};

export default globalErrorHandler;
