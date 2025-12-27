import { ISwimDataGateway, SwimDataFilter } from './ISwimDataGateway';
import { RawSwimRecord, SwimRecordIndex } from '../types/RawSwimRecord';
import staticData from '../fixtures/swimData.json';

/**
 * Static implementation of ISwimDataGateway that uses bundled JSON data.
 * This is the current/legacy implementation before API migration.
 */
export class StaticSwimDataGateway implements ISwimDataGateway {
  private data: RawSwimRecord[] = staticData as RawSwimRecord[];

  async fetchRecords(filter?: SwimDataFilter): Promise<RawSwimRecord[]> {
    let results = [...this.data];

    // Apply filters in-memory
    if (filter?.swimmerName) {
      const nameRegex = new RegExp(filter.swimmerName, 'i');
      results = results.filter(r =>
        nameRegex.test(r[SwimRecordIndex.DISPLAY_NAME])
      );
    }

    if (filter?.team) {
      results = results.filter(r => r[SwimRecordIndex.TEAM] === filter.team);
    }

    if (filter?.event) {
      results = results.filter(r => r[SwimRecordIndex.EVENT] === filter.event);
    }

    if (filter?.year) {
      results = results.filter(r =>
        r[SwimRecordIndex.DATE].startsWith(filter.year)
      );
    }

    if (filter?.limit) {
      results = results.slice(0, filter.limit);
    }

    return results;
  }

  async getLatestDate(): Promise<string> {
    return this.data.reduce((latest, record) => {
      const date = record[SwimRecordIndex.DATE];
      return date > latest ? date : latest;
    }, '0');
  }

  async getSwimmerNames(): Promise<string[]> {
    const names = this.data.map(r => r[SwimRecordIndex.DISPLAY_NAME]);
    return Array.from(new Set(names)).sort();
  }
}
