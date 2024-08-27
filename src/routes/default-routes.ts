import { Request, Response, Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../swagger/swagger-documentation.json';

let count = 0;
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
  process.stdout.write(`Requests: ${count + 1}\r`);
  count++;
  return res.status(200).json({ success: true, message: 'Welcome to Node Typescript Starter Kit' });
});

defaultRoutes.get('/benchmark', (req, res) => {
  const _requests = req.query.requests;
  let requests = 100;
  if (typeof _requests === 'string')
    // Simulate a high-load response
    requests = parseInt(_requests, 10);
  let completed = 0;

  // Function to simulate high-load
  const simulateLoad = () => {
    if (completed >= requests) {
      res.send('Benchmark test complete!');
      if (process.send) process.send({ type: 'requestCount', count: count });
      return;
    }
    completed += 1;
    setImmediate(simulateLoad);
  };

  process.stdout.write(`Requests: ${count + 1}\r`);
  count++;

  simulateLoad();
});

// swagger document route
// when you hit this route you shall auto generated swagger documentation
defaultRoutes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default defaultRoutes;
