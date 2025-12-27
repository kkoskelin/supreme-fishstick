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
 * Fetch all swim records, latest date, and swimmer names using the configured gateway.
 * This is now async since it may call an API.
 */
export async function getLatestSwimRecordAndNamesAndData() {
  // Fetch all data using the configured gateway
  const rawData = await gateway.fetchRecords();
  const latestSwimRecordDate = await gateway.getLatestDate();
  const swimmerNames = await gateway.getSwimmerNames();

  return {
    latestSwimRecordDate,
    rawData,
    swimmerNames,
  };
}
