import { Context } from '../presenter';
// import { SwimRecord } from '../../types/SwimRecord';
import { mockSwimRecord } from '../../fixtures/mockData';

export const addRecords = async (context: Context) => {
  const record = { ...mockSwimRecord };
  record.convertedTime = Math.random() * 100;
  await context.effects.rankingsGateway.addRecord(record);
};
