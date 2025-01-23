import { Routes } from '@angular/router';
import { EntrancePageComponent } from './pages/entrance-page/entrance-page.component';
import { MovieDetailsPageComponent } from './pages/movie-details-page/movie-details-page.component';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', component: EntrancePageComponent },
  {
    path: 'movie',
    component: MoviePageComponent,
  },
  {
    path: 'movie/:id',
    component: MovieDetailsPageComponent,
  },
  { path: '**', component: NotFoundPageComponent },
];
