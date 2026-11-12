import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { GIPHY_CONFIG } from '../config/giphy.config';
import { mapGif } from '../mappers/gif.mapper';
import { Gif } from '../models/gif.model';
import { GiphyListResponse } from '../models/giphy-api.model';
import { GifSearchParams } from '../models/gif-search-params.model';
import { PaginatedResult } from '../models/paginated-result.model';

@Injectable({ providedIn: 'root' })
export class GiphyApiService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(GIPHY_CONFIG);

  search({ query, page }: GifSearchParams): Observable<PaginatedResult<Gif>> {
    const params = new HttpParams()
      .set('q', query)
      .set('limit', this.config.pageSize)
      .set('offset', page * this.config.pageSize)
      .set('rating', this.config.rating);

    return this.http
      .get<GiphyListResponse>(`${this.config.apiUrl}/gifs/search`, { params })
      .pipe(
        map(({ data, pagination }) => ({
          items: data.map(mapGif),
          totalCount: pagination.total_count,
        })),
      );
  }
}
