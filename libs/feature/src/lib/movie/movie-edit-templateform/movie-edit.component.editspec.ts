import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Component, Input, Directive, HostListener } from '@angular/core'
import { AlertService } from '../../../shared/alert/alert.service'
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router'
import { MovieService } from '../movie.service'
import { BehaviorSubject, of, Subscription } from 'rxjs'
import { MovieEditComponent } from './movie-edit.component'
import { AuthService } from '../../auth/auth.service'
import { StudioService } from '../../studio/studio.service'
import { AgeCategory, Movie } from '../movie.model'
import { User } from '../../user/user.model'
import { Studio } from '../../studio/studio.model'
import { FormsModule } from '@angular/forms'

@Component({ selector: 'cswp-spinner', template: '' })
class AppSpinnerStubComponent {}

@Directive({
  selector: '[routerLink]'
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any
  navigatedTo: any = null

  @HostListener('click')
  onClick(): void {
    this.navigatedTo = this.linkParams
  }
}

// Global mock objects
const expectedUserData: User = {
  id: '619bdb5e3b174a700c923de8',
  name: { firstName: 'Firstname', lastName: 'Lastname' },
  emailAdress: 'user@host.com',
  token: 'valid.jwt.token'
}

const expectedMovie: Movie = {
  id: '619bdb5e3b174a700c923da3',
  name: 'moviename',
  studio: 'studioname',
  ageCategory: AgeCategory.all,
  releaseYear: 2020,
  actors: [],
  inTheatres: true,
  user: expectedUserData
}

const studios: Studio[] = [{ id: '1', name: 'Paramount', userid: 1 }]

/**
 *
 */
describe('MovieEditComponent', () => {
  // De 'echte' component-under-test - deze mocken we dus niet!
  let component: MovieEditComponent
  let fixture: ComponentFixture<MovieEditComponent>

  // Mock services die de constructor nodig heeft
  let alertServiceSpy: any
  let movieServiceSpy: any
  let authServiceSpy: any
  let studioServiceSpy: any
  let routerSpy: any

  /**
   *
   */
  beforeEach(() => {
    // Initialiseer de services als Jasmine Spy objecten
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['error', 'success'])
    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'login',
      'register',
      'logout',
      'getUserFromLocalStorage',
      'saveUserToLocalStorage',
      'userMayEdit'
    ])
    const mockUser$ = new BehaviorSubject<IUser>(expectedUserData)
    authServiceSpy.currentUser$ = mockUser$

    movieServiceSpy = jasmine.createSpyObj('MovieService', ['read', 'update'])
    studioServiceSpy = jasmine.createSpyObj('StudioService', ['list'])
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl'])

    TestBed.configureTestingModule({
      // The declared components needed to test the UsersComponent.
      declarations: [
        MovieEditComponent, // The 'real' component that we will test
        RouterLinkStubDirective, // Stubbed component required to instantiate the real component.
        AppSpinnerStubComponent
      ],
      imports: [FormsModule],
      //
      // The constructor of our real component uses dependency injected services
      // Never provide the real service in testcases!
      //
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: StudioService, useValue: studioServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(
              convertToParamMap({
                id: '619bdb5e3b174a700c923da3'
              })
            )
          }
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(MovieEditComponent)
    component = fixture.componentInstance
  })

  /**
   *
   */
  afterEach(() => {
    fixture.destroy()
  })

  /**
   *
   */
  it('should create component instance for updating existing movie', (done) => {
    movieServiceSpy.read.and.returnValue(of(expectedMovie))
    studioServiceSpy.list.and.returnValue(of(studios))

    // Deze zijn nodig zodat we in ngOnDestroy kunnen unsubsciben.
    component.subscriptionOptions = new Subscription()
    component.subscriptionParams = new Subscription()
    component.subscriptionStudios = new Subscription()

    fixture.detectChanges()
    expect(component).toBeTruthy()
    expect(component.studios).toEqual(studios)
    expect(component.movie).toEqual(expectedMovie)
    expect(component.title).toEqual(expectedMovie.name)

    fixture.detectChanges()
    fixture
      .whenStable()
      .then(() => {
        let sub: Subscription = authServiceSpy.currentUser$.subscribe(
          (user: User | null) => {
            expect(user?.token).toEqual(expectedUserData.token)
          }
        )
        sub.unsubscribe()
        expect(movieServiceSpy.read).toHaveBeenCalled()
        done()
      })
      .catch(fail)
  })
})
