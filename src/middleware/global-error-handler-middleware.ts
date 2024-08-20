import { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalErrorHandler = (err: any, req: Request, res: Response) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      status: 'error',
      message: err.message,
    });
  } else {
    console.error('ERROR 💥:', err);
    res.status(500).json({
      success: false,
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

export default globalErrorHandler;
