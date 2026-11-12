import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { GIPHY_CONFIG } from '../config/giphy.config';

export const giphyApiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const { apiUrl, apiKey } = inject(GIPHY_CONFIG);

  if (!req.url.startsWith(apiUrl)) {
    return next(req);
  }

  return next(req.clone({ setParams: { api_key: apiKey } }));
};
