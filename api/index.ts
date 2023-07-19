import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';
// import { SwimRecord } from '../src/types/SwimRecord';
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

const SWIM_RECORDS_DB = process.env.SWIM_RECORDS_DB;
const client = new DynamoDBClient({});
const dynamoDbClient = DynamoDBDocumentClient.from(client);

app.get('/hello', (req: Request, res: Response) => {
  res.json({ general: 'kenobi', hello: 'there' });
});

// app.get(
//   '/swim-records/:id',
//   async (req: Request, res: Response): Promise<void> => {
//     const params = {
//       Key: {
//         id: req.params.id,
//       },
//       TableName: SWIM_RECORDS_DB,
//     };
//     try {
//       const { Item } = await dynamoDbClient.send(new GetCommand(params));
//       if (Item) {
//         const result = { ...Item };
//         res.json(result);
//       } else {
//         res
//           .status(404)
//           .json({ error: 'Could not find record with provided "id"' });
//       }
//     } catch (error) {
//       console.log(error);
//       res
//         .status(500)
//         .json({ error: 'Could not retrieve record', message: error.message });
//     }
//   },
// );

app.post('/swim-records', (req: Request, res: Response) =>
  createRecords(req, res),
);

function createRecords(req: Request, res: Response) {
  const swimRecord: unknown = req.body;
  const isValid = true;
  if (!isValid) {
    res.status(400).json({ error: 'swimRecord was invalid' });
  }

  // const params = {
  //   Item: swimRecord,
  //   TableName: SWIM_RECORDS_DB,
  // };

  try {
    // await dynamoDbClient.send(new PutCommand(params));
    res.json(swimRecord);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Could not create user' });
  }
}

app.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

export const handler = serverless(app);
