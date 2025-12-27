import { httpGateway } from '../../gateways/httpGateway';
import { rankingsGateway } from '../../gateways/rankingsGateway';
import {
  getLatestSwimRecordAndNamesAndData,
  fetchSwimRecords
} from '../../fixtures/swimData';

export const effects = {
  httpGateway,
  rankingsGateway,
  swimData: {
    getLatestSwimRecordAndNamesAndData,
    fetchSwimRecords,
  },
};
