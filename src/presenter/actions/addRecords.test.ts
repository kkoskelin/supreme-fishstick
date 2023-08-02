import { SwimRecord } from '../../types/SwimRecord';
import { mockSwimRecord } from '../../fixtures/mockData';
import { overmindApp } from '../presenter';
const { actions, effects } = overmindApp;

describe('addRecords', () => {
  // it('sends records to the rankings gateway', async () => {
  //   const addRecordsMock = jest.fn();
  //   effects.rankingsGateway.addRecords = addRecordsMock;
  //   const swimRecords: SwimRecord[] = [
  //     { ...mockSwimRecord, age: 17 },
  //     { ...mockSwimRecord, age: 55 },
  //   ];
  //   await actions.addRecords(swimRecords);
  //   expect(addRecordsMock).toHaveBeenCalledWith(swimRecords);
  // });
});
