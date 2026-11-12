import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

import { FileSizePipe } from '../../pipes/file-size.pipe';
import { GiphyApiService } from '../../services/giphy-api.service';
import { getErrorMessage } from '../../utils/http-error-message';

@Component({
  selector: 'app-gif-details-page',
  imports: [
    DatePipe,
    RouterLink,
    FileSizePipe,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './gif-details.page.html',
  styleUrl: './gif-details.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifDetailsPage {
  private readonly giphyApi = inject(GiphyApiService);

  readonly id = input.required<string>();

  protected readonly gif = rxResource({
    params: () => this.id(),
    stream: ({ params: id }) => this.giphyApi.getById(id),
  });

  protected readonly errorMessage = computed(() => {
    const error = this.gif.error();
    return error ? getErrorMessage(error) : null;
  });
}
