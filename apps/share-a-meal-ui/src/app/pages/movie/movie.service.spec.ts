import { HttpClient } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { User } from '../user/user.model'
import { AgeCategory, Movie } from './movie.model'
import { MovieService } from './movie.service'

// Global mock objects
const expectedUserData: User = {
  id: 'mongoid',
  name: { firstName: 'Firstname', lastName: 'Lastname' },
  emailAdress: 'user@host.com',
  token: 'some.dummy.token'
}

const expectedMovies: Movie[] = [
  {
    id: 'mongoid',
    name: 'moviename',
    studio: { id: 'mongoid', name: 'studioname' },
    ageCategory: AgeCategory.all,
    releaseYear: 2020,
    actors: [],
    inTheatres: true,
    user: expectedUserData
  }
]

describe('MovieService', () => {
  let service: MovieService
  let httpSpy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post'])

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpSpy }]
    })
    service = TestBed.inject(MovieService)
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>
  })

  //
  //
  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  //
  //
  it('should return a list of movies', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(expectedMovies))

    service.list().subscribe((movies: Movie[] | null) => {
      if (movies) {
        console.log(movies)
        expect(movies?.length).toBe(1)
        expect(movies[0].id).toEqual(expectedMovies[0].id)
        done()
      }
    })
  })
})
