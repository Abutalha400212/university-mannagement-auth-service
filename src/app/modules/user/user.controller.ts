import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import { catchAsync } from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import httpStatus from 'http-status';

const createStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { student, ...userData } = req.body;
    const result = await UserService.createStudent(student, userData);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User Created',
      data: result,
    });
  }
);

export const UserController = {
  createStudent,
};
