import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import { catchAsync } from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../Shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { academicSemesterFilterableFields } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const academicSemester = req.body;
    const result =
      await AcademicSemesterService.createAcademicSemester(academicSemester);

    sendResponse<IAcademicSemester>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Semester is Created Successfully',
      data: result,
    });
  }
);

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemesterFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await AcademicSemesterService.getAllSemester(
      paginationOptions,
      filters
    );

    sendResponse<IAcademicSemester[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Semester Retrived Successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);
const getAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AcademicSemesterService.getAcademicSemester(
      req.params.id
    );

    sendResponse<IAcademicSemester>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Semester Retrived Successfully',
      data: result,
    });
  }
);
const updateAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AcademicSemesterService.updateAcademicSemester(
      req.params.id,
      req.body
    );

    sendResponse<IAcademicSemester>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Semester Updated Successfully',
      data: result,
    });
  }
);
const deleteAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AcademicSemesterService.deleteAcademicSemester(
      req.params.id
    );

    sendResponse<IAcademicSemester>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Semester Deleted Successfully',
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllSemester,
  getAcademicSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
};
