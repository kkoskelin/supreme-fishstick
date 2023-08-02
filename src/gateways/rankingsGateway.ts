import { SwimRecord } from '../types/SwimRecord';
import { httpGateway } from './httpGateway';

// const searchRankings = async () => {
//   return await searchDocuments();
// };

// const deleteRecords = async () => {
//   return await deleteDocuments();
// };

const addRecord = async (record: SwimRecord) => {
  return await httpGateway.post(
    'https://f6zx3haedl.execute-api.us-east-1.amazonaws.com/swim-records',
    record,
  );
};

export const rankingsGateway = { addRecord };
