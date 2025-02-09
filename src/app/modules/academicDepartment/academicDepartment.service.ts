import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { PaginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';
import { academicDepartmentSearchableFields } from './academicDepartment.constant';

const createAcademicDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  const result = await (
    await AcademicDepartment.create(payload)
  ).populate('academicFaculty');
  if (!result) {
    throw new ApiError(400, 'Failed to create Department');
  }
  return result;
};

const getAllAcademicDepartment = async (
  paginationOptions: IPaginationOptions,
  filters: IAcademicDepartmentFilters
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const andCondition = [];
  const { searchTerm, ...filtersData } = filters;
  if (searchTerm) {
    andCondition.push({
      $or: academicDepartmentSearchableFields.map(field => ({
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
  const result = await AcademicDepartment.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .populate('academicFaculty');
  const total = await AcademicDepartment.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getAcademicDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById({ _id: id }).populate(
    'academicFaculty'
  );
  return result;
};
const updateAcademicDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  ).populate('academicFaculty');
  return result;
};
const deleteAcademicDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete({ _id: id });
  return result;
};
export const AcademicDepartmentService = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
};
