import { NextFunction, Request, Response, Router } from 'express';

import CustomError from '../utils/custom-error';

const testErrorRoutes = Router();

// In your routes file
testErrorRoutes.get('/test-system-error', (req: Request, res: Response, next: NextFunction) => {
  // Simulate a system error
  process.nextTick(() => {
    next(new Error('System Error Example'));
  });
});

// In your routes file
// eslint-disable-next-line @typescript-eslint/no-unused-vars
testErrorRoutes.get('/test-programmer-error', (req: Request, res: Response) => {
  throw new Error('Programmer Error Example'); // Uncaught exception
});

// In your routes file
testErrorRoutes.get('/test-operational-error', (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new CustomError('Operational Error Example', 400);
  } catch (err) {
    next(err);
  }
});

testErrorRoutes.get('/test-unhandle-promise-error', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await import('../utils/unhandled-promise-test');
  } catch (err) {
    next(err);
  }
});

export default testErrorRoutes;
