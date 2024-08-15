import express, { Application, Request, Response } from 'express';

const app: Application = express();

// body parser
app.use(express.json());

// simple endpoint
app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ success: true, message: 'Welcome to Node Typescript Boilerplate' });
});

export default app;
