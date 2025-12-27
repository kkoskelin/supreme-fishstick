import { RawSwimRecord } from '../types/RawSwimRecord';

/**
 * Filter criteria for swim records queries
 */
export interface SwimDataFilter {
  swimmerName?: string;
  team?: string;
  event?: number;
  year?: string;
  limit?: number;
}

/**
 * Gateway interface for accessing swim data.
 * This abstraction allows switching between different data sources
 * (static JSON, API, database) without changing business logic.
 *
 * Following clean architecture principles:
 * - Business logic depends on this interface, not concrete implementations
 * - Implementations can be swapped at runtime
 * - Testable with mock implementations
 */
export interface ISwimDataGateway {
  /**
   * Fetch swim records with optional filters
   * @param filter Optional filtering criteria
   * @returns Promise resolving to array of raw swim records
   */
  fetchRecords(filter?: SwimDataFilter): Promise<RawSwimRecord[]>;

  /**
   * Get the most recent swim record date in the dataset
   * @returns Promise resolving to ISO date string (YYYY-MM-DD)
   */
  getLatestDate(): Promise<string>;

  /**
   * Get all unique swimmer names for autocomplete/search
   * @returns Promise resolving to sorted array of swimmer names
   */
  getSwimmerNames(): Promise<string[]>;
}
