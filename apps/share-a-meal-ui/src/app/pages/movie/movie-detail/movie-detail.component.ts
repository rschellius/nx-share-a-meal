import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Observable } from 'rxjs'
import { switchMap, tap, delay } from 'rxjs/operators'
import { AuthService } from '../../../auth/auth.service'
import { Movie } from '../movie.model'
import { MovieService } from '../movie.service'

@Component({
  selector: 'samui-movie-detail',
  templateUrl: './movie-detail.component.html'
})
export class MovieDetailComponent implements OnInit {
  movie$!: Observable<Movie>

  constructor(
    private movieService: MovieService,
    public authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Movie ophalen
    console.log('ngOnInit')
    this.movie$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.movieService.read(params.get('id'))),
      // tap(console.log),
      delay(400)
    )
  }
}
