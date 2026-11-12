import { ChangeDetectionStrategy, Component, effect, inject, linkedSignal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
    RouterLink,
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
  private readonly giphyApiService = inject(GiphyApiService);
  private readonly router = inject(Router);

  /** Search state restored from the URL, so returning from a details page keeps the results. */
  private readonly initialParams = inject(ActivatedRoute).snapshot.queryParamMap;
  private readonly initialQuery = this.initialParams.get('q')?.trim() ?? '';
  private readonly initialPage = Math.max(0, (Number(this.initialParams.get('page')) || 1) - 1);

  protected readonly pageSize = inject(GIPHY_CONFIG).pageSize;
  protected readonly queryControl = new FormControl(this.initialQuery, { nonNullable: true });

  protected readonly query = toSignal(
    this.queryControl.valueChanges.pipe(
      debounceTime(SEARCH_DEBOUNCE_MS),
      map((value) => value.trim()),
      distinctUntilChanged(),
    ),
    { initialValue: this.initialQuery },
  );

  protected readonly page = linkedSignal<string, number>({
    source: this.query,
    computation: (_, previous) => (previous ? 0 : this.initialPage),
  });

  protected readonly results = rxResource({
    params: () => {
      const query = this.query();
      return query ? { query, page: this.page() } : undefined;
    },
    stream: ({ params }) => this.giphyApiService.search(params),
  });

  constructor() {
    effect(() => {
      const q = this.query();
      const page = this.page();

      this.router.navigate([], {
        queryParams: { q: q || null, page: page > 0 ? page + 1 : null },
        replaceUrl: true,
      });
    });
  }

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
