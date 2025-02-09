import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { PaginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicFacultySearchableFields } from './academicFaculty.constant';
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.create(payload);
  if (!result) {
    throw new ApiError(400, 'Failed to create Faculty');
  }
  return result;
};

const getAllAcademicFaculty = async (
  paginationOptions: IPaginationOptions,
  filters: IAcademicFacultyFilters
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const andCondition = [];
  const { searchTerm, ...filtersData } = filters;

  if (searchTerm) {
    andCondition.push({
      $or: academicFacultySearchableFields.map(field => ({
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
  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicFaculty.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getAcademicFaculty = async (id: string) => {
  const result = await AcademicFaculty.findById({ _id: id });
  return result;
};
const updateAcademicFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
) => {
  const result = await AcademicFaculty.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteAcademicFaculty = async (id: string) => {
  const result = await AcademicFaculty.findByIdAndDelete({ _id: id });
  return result;
};
export const AcademicFacultyService = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
