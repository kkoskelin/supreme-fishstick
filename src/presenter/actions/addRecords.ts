import { Context } from '../presenter';
import { SwimRecord } from '../../types/SwimRecord';

export const addRecords = async (context: Context, records: SwimRecord[]) => {
  await context.effects.rankingsGateway.addRecords(records);
};
