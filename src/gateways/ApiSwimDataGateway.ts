import { ISwimDataGateway, SwimDataFilter } from './ISwimDataGateway';
import { RawSwimRecord } from '../types/RawSwimRecord';

/**
 * API-based implementation of ISwimDataGateway.
 * Fetches data from Vercel serverless functions backed by Supabase.
 */
export class ApiSwimDataGateway implements ISwimDataGateway {
  private baseUrl: string;

  /**
   * @param baseUrl Base URL for API endpoints (e.g., https://your-app.vercel.app)
   *                Empty string for same-origin requests
   */
  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  async fetchRecords(filter?: SwimDataFilter): Promise<RawSwimRecord[]> {
    const params = new URLSearchParams();

    if (filter?.swimmerName) params.append('swimmerName', filter.swimmerName);
    if (filter?.team) params.append('team', filter.team);
    if (filter?.event) params.append('event', filter.event.toString());
    if (filter?.year) params.append('year', filter.year);
    if (filter?.limit) params.append('limit', filter.limit.toString());

    const url = `${this.baseUrl}/api/swim-records?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const json = await response.json();

    if (!json.success) {
      throw new Error(json.error || 'API request failed');
    }

    return json.records as RawSwimRecord[];
  }

  async getLatestDate(): Promise<string> {
    const url = `${this.baseUrl}/api/latest-date`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const json = await response.json();

    if (!json.success) {
      throw new Error(json.error || 'API request failed');
    }

    return json.latestDate;
  }

  async getSwimmerNames(): Promise<string[]> {
    const url = `${this.baseUrl}/api/swimmer-names`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const json = await response.json();

    if (!json.success) {
      throw new Error(json.error || 'API request failed');
    }

    return json.names;
  }
}
