import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieEditComponent } from './movie-edit-templateform/movie-edit.component';
import { MovieCardComponent } from './movie-list/movie-card/movie-card.component';
import { MovieFilterComponent } from './movie-filter/movie-filter.component';

export const components: any[] = [
  MovieDetailComponent,
  MovieEditComponent,
  MovieListComponent,
  MovieCardComponent,
  MovieFilterComponent,
];

export * from './movie-detail/movie-detail.component';
export * from './movie-list/movie-list.component';
export * from './movie-edit-templateform/movie-edit.component';
