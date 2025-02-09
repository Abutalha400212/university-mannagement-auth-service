import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';

export const handleCastError = (err: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: err.path,
      message: 'Invalid id',
    },
  ];

  return {
    statusCode: 400,
    message: 'Cast error',
    errorMessages: errors,
  };
};
