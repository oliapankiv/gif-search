import { InjectionToken } from '@angular/core';

import { environment } from '../../environments/environment';

export interface GiphyConfig {
  readonly apiUrl: string;
  readonly apiKey: string;
  readonly pageSize: number;
  readonly rating: string;
}

export const GIPHY_CONFIG = new InjectionToken<GiphyConfig>('GIPHY_CONFIG', {
  providedIn: 'root',
  factory: () => ({
    apiUrl: environment.giphy.apiUrl,
    apiKey: environment.giphy.apiKey,
    pageSize: 24,
    rating: 'g',
  }),
});
