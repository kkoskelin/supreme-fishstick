import { Context } from '../presenter';
import { SwimRecord } from '../../types/SwimRecord';

export const searchRankings = async (context: Context) => {
  const results =
    (await context.effects.rankingsGateway.searchRankings()) as SwimRecord[];
  const safeObject = JSON.parse(JSON.stringify(results)) as SwimRecord[];
  context.state.swimData = safeObject;
};
