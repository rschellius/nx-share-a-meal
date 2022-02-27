import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { initialFilters, MovieFilters } from './movie-filter.component';

@Injectable({
  providedIn: 'root',
})
export class MoviefilterService {
  public filterValues$ = new BehaviorSubject<MovieFilters>(initialFilters);
}
