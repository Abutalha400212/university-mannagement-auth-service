import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';
import { IGenericErrorResponse } from '../interfaces/common';

export const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(el => {
    if (el instanceof mongoose.Error.ValidatorError) {
      return {
        path: el?.path,
        message: el?.message,
      };
    } else if (el instanceof mongoose.Error.CastError) {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
    return {
      path: 'unknown',
      message: 'Unknown error occurred',
    };
  });

  return {
    statusCode: 400,
    message: 'Validation error',
    errorMessages: errors,
  };
};
