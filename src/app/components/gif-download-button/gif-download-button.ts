import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';

import { Gif } from '../../models/gif.model';
import { GifDownloadService } from '../../services/gif-download.service';

@Component({
  selector: 'app-gif-download-button',
  imports: [MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  template: `
    <button mat-flat-button type="button" [disabled]="downloading()" (click)="download()">
      @if (downloading()) {
        <mat-spinner diameter="18" />
      } @else {
        <mat-icon>download</mat-icon>
      }
      {{ downloading() ? 'Downloading…' : 'Download' }}
    </button>
  `,
  styles: `
    mat-spinner {
      display: inline-block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifDownloadButton {
  private readonly gifDownloadService = inject(GifDownloadService);
  private readonly destroyRef = inject(DestroyRef);

  readonly gif = input.required<Gif>();

  protected readonly downloading = signal(false);

  protected download(): void {
    this.downloading.set(true);
    this.gifDownloadService
      .download(this.gif())
      .pipe(
        finalize(() => this.downloading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
