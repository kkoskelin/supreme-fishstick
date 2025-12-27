import { ISwimDataGateway, SwimDataFilter } from './ISwimDataGateway';
import { RawSwimRecord, SwimRecordIndex } from '../types/RawSwimRecord';

/**
 * Static implementation of ISwimDataGateway that uses bundled JSON data.
 * This is the current/legacy implementation before API migration.
 * Uses lazy loading to avoid bundling data when API gateway is used.
 */
export class StaticSwimDataGateway implements ISwimDataGateway {
  private data: RawSwimRecord[] | null = null;

  private async loadData(): Promise<RawSwimRecord[]> {
    if (this.data === null) {
      // Dynamic import to avoid bundling when not used
      const module = await import('../fixtures/swimData.json');
      this.data = module.default as RawSwimRecord[];
    }
    return this.data;
  }

  async fetchRecords(filter?: SwimDataFilter): Promise<RawSwimRecord[]> {
    const data = await this.loadData();
    let results = [...data];

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
    const data = await this.loadData();
    return data.reduce((latest, record) => {
      const date = record[SwimRecordIndex.DATE];
      return date > latest ? date : latest;
    }, '0');
  }

  async getSwimmerNames(): Promise<string[]> {
    const data = await this.loadData();
    const names = data.map(r => r[SwimRecordIndex.DISPLAY_NAME]);
    return Array.from(new Set(names)).sort();
  }
}
