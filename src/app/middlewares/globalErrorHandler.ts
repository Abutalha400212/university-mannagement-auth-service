import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaces/error';
import { handleValidationError } from '../../errors/handleValidationError';
import ApiError from '../../errors/ApiError';
import { ZodError } from 'zod';
import { handleZodError } from '../../errors/handleZodError';
import { handleCastError } from '../../errors/handleCastError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Something Went Wrong';
  let errorMesssages: IGenericErrorMessage[] = [];

  if (err?.name === 'ValidatorError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMesssages = simplifiedError.errorMessages;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMesssages = simplifiedError.errorMessages;
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMesssages = simplifiedError.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorMesssages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMesssages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMesssages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
