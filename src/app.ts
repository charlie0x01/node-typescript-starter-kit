import express, { Application, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import swaggerDocument from './swagger/swagger-documentation.json';
import globalErrorHandler from './middleware/global-error-handler-middleware';
// routes
import testErrorRoutes from './routes/global-error-test-routes';

const app: Application = express();

// body parser
app.use(express.json());
// use cors
app.use(cors());
// set public folder for static files
app.use(express.static(__dirname?.replace('src', '') + 'public'));

// error testing routes
app.use(testErrorRoutes);
// swagger document route
// when you hit this route you shall auto generated swagger documentation
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// simple endpoint
app.get('/api/v1', (req: Request, res: Response) => {
  // #swagger.summary = "Welcome API Endpoint to start with"
  /*  #swagger.responses[200] = {
            description: 'Some description...',
            schema: {
                sucess: true,
                message: "Welcome to Node Typescript Boilerplate"
            }
    } */
  return res.status(200).json({ success: true, message: 'Welcome to Node Typescript Starter Kit' });
});

// path not found
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'Resource not found',
  });
});

// global error handler
app.use(globalErrorHandler);

export default app;
