import { Context } from '../presenter';
import { mockSwimRecord } from '../../fixtures/mockData';

export const addRecords = (context: Context) => {
  const record = { ...mockSwimRecord };
  record.convertedTime = Math.random() * 100;
  // await context.effects.rankingsGateway.addRecord(record);
};
