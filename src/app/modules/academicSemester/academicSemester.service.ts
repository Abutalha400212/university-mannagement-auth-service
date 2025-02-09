import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import { AcademicSemester } from './academicSemester.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { PaginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }
  const result = await AcademicSemester.create(payload);
  if (!result) {
    throw new ApiError(400, 'Failed to create user');
  }

  return result;
};

const getAllSemester = async (
  paginationOptions: IPaginationOptions,
  filters: IAcademicSemesterFilters
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const andCondition = [];
  const { searchTerm, ...filtersData } = filters;

  if (searchTerm) {
    andCondition.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await AcademicSemester.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getAcademicSemester = async (id: string) => {
  const result = await AcademicSemester.findById({ _id: id });
  return result;
};
const updateAcademicSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
) => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }
  const result = await AcademicSemester.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return result;
};
const deleteAcademicSemester = async (id: string) => {
  const result = await AcademicSemester.findByIdAndDelete({ _id: id });
  return result;
};
export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemester,
  getAcademicSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
};
