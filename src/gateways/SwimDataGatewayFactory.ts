import { ISwimDataGateway } from './ISwimDataGateway';
import { ApiSwimDataGateway } from './ApiSwimDataGateway';
import { StaticSwimDataGateway } from './StaticSwimDataGateway';

export type GatewayType = 'static' | 'api';

/**
 * Factory for creating swim data gateways.
 * Implements dependency injection pattern for clean architecture.
 *
 * Usage:
 *   const gateway = SwimDataGatewayFactory.create('api', 'https://myapp.vercel.app');
 *   const records = await gateway.fetchRecords();
 */
export class SwimDataGatewayFactory {
  /**
   * Create a gateway instance based on type
   * @param type Type of gateway to create
   * @param apiBaseUrl Base URL for API gateway (required if type='api')
   * @returns Gateway instance implementing ISwimDataGateway
   */
  static create(type: GatewayType, apiBaseUrl?: string): ISwimDataGateway {
    switch (type) {
      case 'api':
        return new ApiSwimDataGateway(apiBaseUrl);
      case 'static':
      default:
        return new StaticSwimDataGateway();
    }
  }
}
