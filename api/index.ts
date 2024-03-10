/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { applicationContext } from './src/applicationContext';
import cors from 'cors';
import express, { Request, Response } from 'express';
import serverless from 'serverless-http';

const allowedOrigins = ['http://localhost:1234'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();
app.use(cors(options));
app.use(express.json());

const date = new Date().toISOString();

app.get('/hello', (req: Request, res: Response) => {
  res.json({ date, general: 'kenobi', hello: 'there' });
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/swimmer-records/:swimmerId', async (req: Request, res: Response) => {
  const { swimmerId } = req.params;
  const result = await applicationContext.getSwimmerRecords(swimmerId);
  return res.json(result);
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

export const handler = serverless(app);
