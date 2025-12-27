import { RawSwimRecord, SwimRecordIndex } from '../types/RawSwimRecord';
import { SwimDataGatewayFactory } from '../gateways/SwimDataGatewayFactory';
import { config } from '../config/environment';

// Create gateway instance based on configuration
const gateway = SwimDataGatewayFactory.create(
  config.gatewayType,
  config.apiBaseUrl
);

function greatestDateReducer(acc: string, record: RawSwimRecord): string {
  return String(record[SwimRecordIndex.DATE]).localeCompare(acc) > 0
    ? record[SwimRecordIndex.DATE]
    : acc;
}

export function findMostRecentDate(swimData: RawSwimRecord[]): string {
  const latestSwimRecord = swimData.reduce(greatestDateReducer, '0');
  return latestSwimRecord;
}

/**
 * Fetch metadata (latest date and swimmer names) without loading all records.
 * Records will be fetched on-demand when user performs a search.
 */
export async function getLatestSwimRecordAndNamesAndData() {
  // Only fetch metadata on initial load, not all records
  const latestSwimRecordDate = await gateway.getLatestDate();
  const swimmerNames = await gateway.getSwimmerNames();

  return {
    latestSwimRecordDate,
    rawData: [], // Start with empty data - will be populated on search
    swimmerNames,
  };
}

/**
 * Fetch swim records with optional filters using the configured gateway.
 */
export async function fetchSwimRecords(filter?: {
  swimmerName?: string;
  team?: string;
  year?: string;
  limit?: number;
}) {
  return await gateway.fetchRecords(filter);
}
