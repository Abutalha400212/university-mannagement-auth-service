import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../Shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { AcademicFacultyService } from './academicFaculty.service';
import { IAcademicFaculty } from './academicFaculty.interface';
import { academicFacultyFilterableFields } from './academicFaculty.constant';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicFaculty } = req.body;
    const result =
      await AcademicFacultyService.createAcademicFaculty(academicFaculty);

    sendResponse<IAcademicFaculty>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Faculty is Created Successfully',
      data: result,
    });
  }
);

const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicFacultyFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await AcademicFacultyService.getAllAcademicFaculty(
      paginationOptions,
      filters
    );

    sendResponse<IAcademicFaculty[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Faculty Retrived Successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);
const getAcademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await AcademicFacultyService.getAcademicFaculty(id);

    sendResponse<IAcademicFaculty>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Faculty Retrived Successfully',
      data: result,
    });
  }
);
const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { ...updatedAcademicFacultyData } = req.body;
    const result = await AcademicFacultyService.updateAcademicFaculty(
      id,
      updatedAcademicFacultyData
    );

    sendResponse<IAcademicFaculty>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Faculty Updated Successfully',
      data: result,
    });
  }
);
const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AcademicFacultyService.deleteAcademicFaculty(
      req.params.id
    );

    sendResponse<IAcademicFaculty>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Faculty Deleted Successfully',
      data: result,
    });
  }
);

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
