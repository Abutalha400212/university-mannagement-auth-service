import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';
import { ZodError } from 'zod';

export const handleZodError = (err: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = err.issues.map(issue => ({
    path: issue?.path[issue.path.length - 1],
    message: issue?.message,
  }));
  return {
    statusCode: 400,
    message: 'Zod error',
    errorMessages: errors,
  };
};
