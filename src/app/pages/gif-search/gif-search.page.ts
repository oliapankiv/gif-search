import { ChangeDetectionStrategy, Component, inject, linkedSignal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

import { GIPHY_CONFIG } from '../../config/giphy.config';
import { GiphyApiService } from '../../services/giphy-api.service';

/** Giphy rejects search offsets above 4999, so pages past that can't be loaded. */
const MAX_RESULTS = 5000;
const SEARCH_DEBOUNCE_MS = 300;

@Component({
  selector: 'app-gif-search-page',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
  ],
  templateUrl: './gif-search.page.html',
  styleUrl: './gif-search.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifSearchPage {
  private readonly giphyApi = inject(GiphyApiService);

  protected readonly pageSize = inject(GIPHY_CONFIG).pageSize;
  protected readonly queryControl = new FormControl('', { nonNullable: true });

  protected readonly query = toSignal(
    this.queryControl.valueChanges.pipe(
      debounceTime(SEARCH_DEBOUNCE_MS),
      map((value) => value.trim()),
      distinctUntilChanged(),
    ),
    { initialValue: '' },
  );

  protected readonly page = linkedSignal({ source: this.query, computation: () => 0 });

  protected readonly results = rxResource({
    params: () => {
      const query = this.query();
      return query ? { query, page: this.page() } : undefined;
    },
    stream: ({ params }) => this.giphyApi.search(params),
  });

  protected paginatorLength(totalCount: number): number {
    return Math.min(totalCount, MAX_RESULTS);
  }

  protected onPageChange({ pageIndex }: PageEvent): void {
    this.page.set(pageIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected clear(): void {
    this.queryControl.setValue('');
  }
}
