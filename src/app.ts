import express, { Application, Request, Response } from 'express';
import cors from 'cors';

// middlewares
import globalErrorHandler from './middleware/global-error-handler-middleware';
// routes
import v1Router from './routes';

const app: Application = express();

// body parser
app.use(express.json());
// use cors
app.use(cors());
// set public folder for static files
app.use(express.static(__dirname?.replace('src', '') + 'public'));

// v1 routes
app.use('/api/v1', v1Router);

// path not found
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'Resource not found',
  });
});

// global error handler
app.use(globalErrorHandler);

export default app;
