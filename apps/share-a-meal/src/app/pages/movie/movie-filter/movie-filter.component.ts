import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { MoviefilterService } from './movie-filter.service';

export interface MovieFilters {
  filterText: string;
  inTheatres: boolean;
  ageCategory: {
    all: boolean;
    children: boolean;
    adults: boolean;
  };
}

export const initialFilters: MovieFilters = {
  filterText: '',
  inTheatres: false,
  ageCategory: {
    all: false,
    children: false,
    adults: false,
  },
};

@Component({
  selector: 'app-filter',
  templateUrl: './movie-filter.component.html',
})
export class MovieFilterComponent implements OnInit {
  filterForm!: FormGroup;

  // @Input() filter: any;

  // Hier minder geschikt, omdat we de stream van events
  // als een Observable stream willen kunnen behandelen.
  // In dit geval werken we met een FilterService met BehaviorSubject.
  // @Output() filterValues = new EventEmitter<MovieFilters>();

  constructor(private movieFilterService: MoviefilterService) {}

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      filterText: new FormControl(''),
      ageCategory: new FormGroup({
        all: new FormControl(undefined),
        children: new FormControl(undefined),
        adults: new FormControl(undefined),
      }),
      ageCategories: new FormArray([]),
      inTheatres: new FormControl(undefined),
    });
  }

  get ageCategories() {
    return this.filterForm.controls['ageCategories'] as FormArray;
  }

  onAgeCategoriesChanged(event: any, value: string): void {
    if (event.srcElement.checked) {
      console.log('Yes, gechecked');
      this.ageCategories.push(new FormControl(value));
    } else {
      this.ageCategories.removeAt(this.ageCategories.value.indexOf(value));
      console.log('Pop, er af');
    }
  }

  onFormChanged(): void {
    // 'Oude', hier minder geschikte manier met EventEmitter
    // this.filterValues.emit(this.filterForm.value);

    this.movieFilterService.filterValues$.next(this.filterForm.value);
  }
}
