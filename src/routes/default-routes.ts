import { Request, Response, Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../swagger/swagger-documentation.json';

const defaultRoutes = Router();

// simple endpoint
defaultRoutes.get('/welcome', (req: Request, res: Response) => {
  // #swagger.tags = ['Welcome']
  // #swagger.summary = "Welcome API Endpoint to start"
  /*  #swagger.responses[200] = {
              description: 'Some description...',
              schema: {
                  sucess: true,
                  message: "Welcome to Node Typescript Boilerplate"
              }
      } */
  return res.status(200).json({ success: true, message: 'Welcome to Node Typescript Starter Kit' });
});

// swagger document route
// when you hit this route you shall auto generated swagger documentation
defaultRoutes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default defaultRoutes;
