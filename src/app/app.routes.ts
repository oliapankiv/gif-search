import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'GIF Search',
    loadComponent: () => import('./pages/gif-search/gif-search.page').then((m) => m.GifSearchPage),
  },
  { path: '**', redirectTo: '' },
];
