import { GatewayType } from '../gateways/SwimDataGatewayFactory';

export interface EnvironmentConfig {
  gatewayType: GatewayType;
  apiBaseUrl?: string;
}

/**
 * Get environment configuration from build-time environment variables.
 *
 * Environment Variables:
 * - REACT_APP_USE_API: "true" to use API gateway, "false" for static (default: "false")
 * - REACT_APP_API_BASE_URL: Base URL for API calls (default: empty string for same-origin)
 */
function getConfig(): EnvironmentConfig {
  // Check for build-time environment variable
  const useApi = process.env.REACT_APP_USE_API === 'true';

  return {
    gatewayType: useApi ? 'api' : 'static',
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || ''
  };
}

export const config = getConfig();

// Log configuration on startup (helpful for debugging)
console.log('[BUILD-TIME] Environment Config:', {
  REACT_APP_USE_API: process.env.REACT_APP_USE_API,
  gatewayType: config.gatewayType,
  apiBaseUrl: config.apiBaseUrl || '(same origin)',
  nodeEnv: process.env.NODE_ENV
});
