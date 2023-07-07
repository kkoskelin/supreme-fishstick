import { SwimRecord } from '../types/SwimRecord';
import { addDocument, deleteDocuments, searchDocuments } from './firebase';

const searchRankings = async () => {
  return await searchDocuments();
};

const deleteRecords = async () => {
  return await deleteDocuments();
};

const addRecords = async (records: SwimRecord[]) => {
  // return await addDocument();
};

export const rankingsGateway = { addRecords, deleteRecords, searchRankings };
