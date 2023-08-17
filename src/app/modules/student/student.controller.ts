import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IStudent } from './student.interface';
import { studentService } from './student.service';
import { paginationFiled, studentFilterableFields } from './student.variable';

export const getAllStudents: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const filters = pick(req.query, studentFilterableFields);
    const paginationOptions = pick(req.query, paginationFiled);

    const result = await studentService.getAllStudents(filters, paginationOptions);

    sendResponse<IStudent[]>(res, {
      statusCode: httpStatus.OK,
      status: 'success',
      message: 'student fetch successfully',
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};
export const getSingleStudent: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await studentService.getSingleStudent(id);

    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      status: 'success',
      message: 'student fetch successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// export const updateStudent: RequestHandler = async (req, res, next): Promise<void> => {
// 	try {
// 		const { id } = req.params;
// 		const updatedData = req.body;

// 		const result = await studentService.updateStudent(id, updatedData);

// 		sendResponse<IStudent>(res, {
// 			statusCode: httpStatus.OK,
// 			status: 'success',
// 			message: 'student updated successfully',
// 			data: result,
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// };

// export const deleteStudent: RequestHandler = async (req, res, next): Promise<void> => {
// 	try {
// 		const { id } = req.params;

// 		const result = await studentService.deleteStudent(id);

// 		sendResponse<IStudent>(res, {
// 			statusCode: httpStatus.OK,
// 			status: 'success',
// 			message: 'student deleted successfully',
// 			data: result,
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// };
