import { NextFunction, Request, Response, Router } from 'express';

import CustomError from '../utils/custom-error';

const testErrorRoutes = Router();

// In your routes file
testErrorRoutes.get('/system-error', (req: Request, res: Response, next: NextFunction) => {
  // #swagger.tags = ['Test Error Handling']
  // Simulate a system error
  process.nextTick(() => {
    next(new Error('System Error Example'));
  });
});

// In your routes file
// eslint-disable-next-line @typescript-eslint/no-unused-vars
testErrorRoutes.get('/programmer-error', (req: Request, res: Response) => {
  // #swagger.tags = ['Test Error Handling']
  throw new Error('Programmer Error Example'); // Uncaught exception
});

// In your routes file
testErrorRoutes.get('/operational-error', (req: Request, res: Response, next: NextFunction) => {
  // #swagger.tags = ['Test Error Handling']
  try {
    throw new CustomError('Operational Error Example', 400);
  } catch (err) {
    next(err);
  }
});

testErrorRoutes.get('/unhandle-promise-error', async (req: Request, res: Response, next: NextFunction) => {
  // #swagger.tags = ['Test Error Handling']
  try {
    await import('../utils/unhandled-promise-test');
  } catch (err) {
    next(err);
  }
});

export default testErrorRoutes;
