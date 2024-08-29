import { NextFunction, Request, Response } from 'express';

import CustomError from '../utils/customError.utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler = (err: Error | CustomError, req: Request, res: Response, next: NextFunction) => {
  // Default error response
  let statusCode = 500;
  let message = 'An unexpected error occurred';
  let userFriendlyMessage = 'Something went wrong. Please try again later.';
  // let errorDetails: any = {};

  // Custom error handling
  if (err instanceof CustomError) {
    // Operational error (e.g., missing parameters)
    statusCode = err.statusCode || 400;
    message = err.message || 'An operational error occurred';
    userFriendlyMessage = message;
  } else if (err.name === 'ValidationError') {
    // JSON or request validation error
    statusCode = 400;
    message = 'Invalid data provided';
    userFriendlyMessage = 'Please check the input data and try again.';
  } else if (err.name === 'SyntaxError') {
    // JSON parsing error
    statusCode = 400;
    message = 'Bad Request: Invalid JSON';
    userFriendlyMessage = 'The request body contains invalid JSON. Please check and try again.';
  } else if (err.name === 'TypeError') {
    // Programmer error (e.g., undefined variable)
    // Do not expose details to the user
    message = 'A programmer error occurred';
    userFriendlyMessage = 'Something went wrong on our end. Please try again later.';
  } else if (err.name === 'ReferenceError' || err.name === 'RangeError') {
    // Other common programmer errors
    message = 'A system error occurred';
    userFriendlyMessage = 'We encountered a problem. Please try again later.';
  }

  // Log the original error message for internal tracking
  console.error(err);

  // Send a structured response to the user
  res.status(statusCode).json({
    status: 'error',
    message: message,
    detail: userFriendlyMessage,
  });
};

export default globalErrorHandler;
