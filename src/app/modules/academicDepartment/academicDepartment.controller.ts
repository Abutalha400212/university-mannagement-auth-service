import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../Shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { AcademicDepartmentService } from './academicDepartment.service';
import { IAcademicDepartment } from './academicDepartment.interface';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicDepartment } = req.body;
    const result =
      await AcademicDepartmentService.createAcademicDepartment(
        academicDepartment
      );

    sendResponse<IAcademicDepartment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Department is Created Successfully',
      data: result,
    });
  }
);

const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await AcademicDepartmentService.getAllAcademicDepartment(
      paginationOptions,
      filters
    );

    sendResponse<IAcademicDepartment[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Department Retrived Successfully',
      data: result.data,
      meta: result.meta,
    });
  }
);
const getAcademicDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await AcademicDepartmentService.getAcademicDepartment(id);

    sendResponse<IAcademicDepartment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Department Retrived Successfully',
      data: result,
    });
  }
);
const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { ...updatedAcademicDepartmentData } = req.body;
    const result = await AcademicDepartmentService.updateAcademicDepartment(
      id,
      updatedAcademicDepartmentData
    );

    sendResponse<IAcademicDepartment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Department Updated Successfully',
      data: result,
    });
  }
);
const deleteAcademicDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AcademicDepartmentService.deleteAcademicDepartment(
      req.params.id
    );

    sendResponse<IAcademicDepartment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Department Deleted Successfully',
      data: result,
    });
  }
);

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
};
