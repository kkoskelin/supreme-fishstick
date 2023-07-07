import { Context } from '../presenter';

export const deleteRecords = async (context: Context) => {
  await context.effects.rankingsGateway.deleteRecords();
};
