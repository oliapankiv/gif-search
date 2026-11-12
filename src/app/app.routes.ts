import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'GIF Search',
    loadComponent: () => import('./pages/gif-search/gif-search.page').then((m) => m.GifSearchPage),
  },
  {
    path: 'gif/:id',
    title: 'GIF details',
    loadComponent: () => import('./pages/gif-details/gif-details.page').then((m) => m.GifDetailsPage),
  },
  { path: '**', redirectTo: '' },
];
