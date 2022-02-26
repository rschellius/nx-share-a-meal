import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AgeCategory, Movie } from '../movie.model';
import { MovieService } from '../movie.service';
import { StudioService } from '../../studio/studio.service';
import { Observable, of, Subject, Subscription } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinct,
  filter,
  switchMap,
  tap,
  map,
} from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { Alert, AlertService } from 'src/app/shared/alert/alert.service';
import { Studio } from '../../studio/studio.model';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
})
export class MovieEditComponent implements OnInit, OnDestroy {
  title: string = '';
  movie!: Movie;
  ageCategory!: AgeCategory;
  studios!: Studio[] | null;
  user_id!: string | undefined;
  httpOptions: any;
  debug = false;

  searchMovieName$ = new Subject<string>();
  existingMovieNames$!: Observable<boolean | null>;

  subscriptionOptions!: Subscription;
  subscriptionParams!: Subscription;
  subscriptionStudios!: Subscription;

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private movieService: MovieService,
    private studioService: StudioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Haal de movie op voor edit
    this.subscriptionParams = this.route.paramMap
      .pipe(
        tap(console.log),
        switchMap((params: ParamMap) => {
          // als we een nieuw item maken is er geen 'id'
          if (!params.get('id')) {
            console.log('GEEN id gevonden');
            // maak een lege movie
            return of(new Movie({}));
          } else {
            console.log('WEL een id gevonden');
            // haal de movie met gevraagde id via de api
            return this.movieService.read(params.get('id'));
          }
        }),
        tap(console.log),
        map((movie) => {
          // movie.studio wordt in de backend populated vanuit het studio-document.
          // De selectbox heeft echter alleen een id nodig. Via deze map pas ik dat aan.
          return {
            ...movie,
            studio: movie?.studio?._id,
          };
        })
      )
      .subscribe((movie: Movie) => {
        this.movie = movie;
        this.title = movie.name !== '' ? movie.name : 'Nieuwe film';
      });

    // Haal de studios voor selectie in dropdownbox
    this.subscriptionStudios = this.studioService
      .list()
      .subscribe((studios) => (this.studios = studios));

    // Haal het token van de current user op zodat we dat mee kunnen sturen naar de backend.
    this.subscriptionOptions = this.authService.currentUser$.subscribe(
      (user: User | undefined) => {
        if (user) {
          this.user_id = user._id;
          this.httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + user.token,
            }),
          };
        }
      }
    );
    // Kijk of de ingetypte movie name al bestaat in de database.
    this.existingMovieNames$ = this.searchMovieName$.pipe(
      // wait 500 msec before processing the next change
      debounceTime(500),
      // only search if the term has not changed
      distinct(),
      // do not search for empty terms - the term must be 'truthy' (true)
      filter((term) => !!term),
      // every time the term changes
      switchMap((term) =>
        // send request GET backendurl/api/movies?name=term
        this.movieService.list({
          params: new HttpParams().set('name', term),
        })
      ),
      map((movies) => movies && movies.length > 0),
      tap((result) => console.log('title exists:', result))
    );
  }

  // Save movie via the service
  onSubmit(): void {
    console.log('onSubmit', this.movie);

    if (this.movie._id) {
      // A movie with id must have been saved before, so it must be an update.
      console.log('update movie');
      this.movieService
        .update(this.movie, this.httpOptions)
        .pipe(
          catchError((error: Alert) => {
            console.log(error);
            this.alertService.error(error.message);
            return of(false);
          })
        )
        .subscribe((success) => {
          console.log(success);
          if (success) {
            this.router.navigate(['..'], { relativeTo: this.route });
          }
        });
    } else {
      // A movie without id has not been saved to the database before.
      console.log('create movie');
      this.movie.user = this.user_id?.toString();
      this.movieService
        .create(this.movie, this.httpOptions)
        .pipe(
          catchError((error: Alert) => {
            console.log(error);
            this.alertService.error(error.message);
            return of(false);
          })
        )
        .subscribe((success) => {
          console.log(success);
          if (success) {
            this.router.navigate(['..'], { relativeTo: this.route });
          }
        });
    }
  }

  checkForExistingMovieName(term: string): void {
    this.searchMovieName$.next(term);
  }

  ngOnDestroy(): void {
    this.subscriptionOptions.unsubscribe();
    this.subscriptionParams.unsubscribe();
    this.subscriptionStudios.unsubscribe();
  }
}
