import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { EntityService } from '@nx-share-a-meal/util'
import { environment } from '../../../environments/environment'
import { Movie } from './movie.model'

@Injectable({
  providedIn: 'root'
})
export class MovieService extends EntityService<Movie> {
  constructor(http: HttpClient) {
    super(http, environment.SERVER_API_URL, 'movies')
  }
}
