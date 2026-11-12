import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, tap } from 'rxjs';

import { Gif } from '../models/gif.model';
import { getErrorMessage } from '../utils/http-error-message';
import { FileSaverService } from './file-saver.service';
import { MediaApiService } from './media-api.service';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class GifDownloadService {
  private readonly mediaApiService = inject(MediaApiService);
  private readonly fileSaverService = inject(FileSaverService);
  private readonly notificationService = inject(NotificationService);

  download(gif: Gif): Observable<void> {
    return this.mediaApiService.getFile(gif.original.url).pipe(
      tap((blob) => this.fileSaverService.save(blob, toFileName(gif))),
      tap(() => this.notificationService.success('Download started')),
      map(() => undefined),
      catchError((error: unknown) => {
        this.notificationService.error(`Download failed. ${getErrorMessage(error)}`);
        return EMPTY;
      }),
    );
  }
}

function toFileName(gif: Gif): string {
  const slug = gif.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);

  return `${slug || 'gif'}-${gif.id}.gif`;
}
