import { HttpHeaders } from '@angular/common/http'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { BehaviorSubject, of, Subscription } from 'rxjs'
import {
  catchError,
  debounceTime,
  distinct,
  filter,
  tap,
  delay
} from 'rxjs/operators'
import { AuthService } from '../../../auth/auth.service'
import { Alert, AlertService } from '../../../shared/alert/alert.service'
import { ModalConfirmYesNoComponent } from '../../../shared/modal/modal.confirm-yes-no.component'
import {
  initialFilters,
  MovieFilters
} from '../movie-filter/movie-filter.component'
import { MoviefilterService } from '../movie-filter/movie-filter.service'
import { Movie } from '../movie.model'
import { MovieService } from '../movie.service'

@Component({
  selector: 'movies-ui-movie-list',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
  movies!: Movie[] | null
  // movies$ = new BehaviorSubject<Movie[] | null>(null);
  subs!: Subscription
  movieListSubscription!: Subscription
  movieFilterSubscription!: Subscription
  httpOptions: any
  filtersAreaIsCollapsed = true

  constructor(
    private movieService: MovieService,
    private alertService: AlertService,
    protected authService: AuthService,
    private movieFilterService: MoviefilterService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadMovies()

    this.subs = this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.token
          })
        }
      }
    })

    /**
     * Handle incoming filter values
     */
    this.movieFilterSubscription = this.movieFilterService.filterValues$
      .pipe(
        debounceTime(500),
        distinct(),
        filter((filters) => !!filters)
      )
      .subscribe((filters: MovieFilters) => {
        if (filters) {
          const { filterText, ageCategory, inTheatres } = filters

          let filteredMovies: Movie[] | null | undefined = this.movies
          if (filterText.length > 0) {
            filteredMovies = filteredMovies?.filter((movie) =>
              movie.name.toLowerCase().includes(filterText)
            )
          }

          if (inTheatres) {
            filteredMovies = filteredMovies?.filter(
              (movie) => movie.inTheatres === inTheatres
            )
          }

          if (filteredMovies) {
            this.movies = filteredMovies
          } else {
            console.log(filteredMovies)
          }
        }
      })
  }

  private loadMovies(): void {
    console.log('loadMovies')
    this.movieListSubscription = this.movieService
      .list()
      .pipe(
        catchError((error: Alert) => {
          this.alertService.error(error.message)
          return of([])
        })
      )
      .subscribe((movies) => {
        console.log(movies)
        this.movies = movies
        // this.movies$.next(this.movies);
      })
  }

  // filterMovies(filters: MovieFilters): void {
  //   const { filterText, ageCategory, inTheatres } = filters;
  //   const filteredMovies = this.movies.filter((movie) =>
  //     movie.name.toLowerCase().includes(filterText)
  //   );
  //   this.movies$.next(filteredMovies);
  // }

  delete(movieId: string): void {
    this.modalService
      .open(ModalConfirmYesNoComponent)
      .result.then((result) => {
        console.log('from modal:', result)
        this.movieService
          .delete(movieId, this.httpOptions)
          .pipe(
            catchError((error: Alert) => {
              console.log(error)
              this.alertService.error(error.message)
              return of(false)
            })
          )
          .subscribe(() => this.loadMovies())
          .unsubscribe()
      })
      .catch((error) => console.log('from modal', error))
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe()
    }
    if (this.movieListSubscription) {
      this.movieListSubscription.unsubscribe()
    }
    if (this.movieFilterSubscription) {
      this.movieFilterSubscription.unsubscribe()
    }
    // reset the filter values when we navigate away
    this.movieFilterService.filterValues$.next(initialFilters)
  }
}
