import express, { NextFunction, Request, Response, Router } from 'express';

import CustomError from '../utils/custom-error';

const testErrorRoutes: Router = express.Router();

// In your routes file
testErrorRoutes.get('/system-error', (req: Request, res: Response, next: NextFunction) => {
  // #swagger.tags = ['Test Error Handling']
  try {
    throw new CustomError('System Error Example', 500);
  } catch (error) {
    next(error);
  }
});

// In your routes file
// eslint-disable-next-line @typescript-eslint/no-unused-vars
testErrorRoutes.get('/programmer-error', (req: Request, res: Response, next: NextFunction) => {
  // #swagger.tags = ['Test Error Handling']
  try {
    throw new CustomError('Programmer Error Example', 500); // Uncaught exception
  } catch (error) {
    next(error);
  }
});

// In your routes file
testErrorRoutes.get('/operational-error', (req: Request, res: Response, next: NextFunction) => {
  // #swagger.tags = ['Test Error Handling']
  try {
    throw new CustomError('Operational Error Example', 400);
  } catch (error) {
    next(error);
  }
});

testErrorRoutes.get('/unhandle-promise-error', async (req: Request, res: Response, next: NextFunction) => {
  // #swagger.tags = ['Test Error Handling']
  try {
    await import('../utils/unhandled-promise-test');
  } catch (error) {
    next(error);
  }
});

export default testErrorRoutes;
