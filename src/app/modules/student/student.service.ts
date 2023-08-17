import { SortOrder } from 'mongoose';
import calculatePagination from '../../../helpers/pagination.helper';
import { IGenericResponse } from '../../../interface/common';
import { IPageOtions } from '../../../interface/pagination';
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';
import { studentSearchableFields } from './student.variable';

const getAllStudents = async (
  filters: IStudentFilters,
  pageOptions: IPageOtions
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filterData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: studentSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({ [field]: value })),
    });
  }

  const options = calculatePagination(pageOptions);
  const page = options.page as number;
  const limit = options.limit as number;
  const skip = options.skip as number;

  const sortCondition: { [key: string]: SortOrder } = {};
  const { sortBy, sortOrder } = options;

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const checkCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Student.find(checkCondition).sort(sortCondition).skip(skip).limit(limit);

  const total = await Student.countDocuments(checkCondition);

  return {
    data: result,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findOne({ id })
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

// const updateStudent = async (
// 	id: string,
// 	updatedData: Partial<IStudent>
// ): Promise<IStudent | null> => {
// 	const result = await Student.findOneAndUpdate({ _id: id }, updatedData, { new: true });

// 	return result;
// };

// const deleteStudent = async (id: string): Promise<IStudent | null> => {
// 	const result = await Student.findByIdAndDelete(id);

// 	return result;
// };

export const studentService = { getAllStudents, getSingleStudent };
// updateStudent, deleteStudent
