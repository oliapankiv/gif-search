import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MediaApiService {
  private readonly http = inject(HttpClient);

  getFile(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }
}
