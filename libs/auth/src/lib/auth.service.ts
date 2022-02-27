import { Inject, Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { IUser } from '@cswp/api-interfaces'
import { Router } from '@angular/router'
import { map, catchError, switchMap } from 'rxjs/operators'
import { AlertService } from '@cswp/util'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CustomConfig } from './auth.module'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<IUser | undefined>(undefined)
  private readonly CURRENT_USER = 'currentuser'
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(
    @Inject('config') private config: CustomConfig,
    private alertService: AlertService,
    private http: HttpClient,
    private router: Router
  ) {
    // Check of we al een ingelogde user hebben
    // Zo ja, check dan op de backend of het token nog valid is.
    // Het token kan namelijk verlopen zijn. Indien verlopen
    // retourneren we meteen een nieuw token.
    this.getUserFromLocalStorage()
      .pipe(
        // switchMap is overbodig als we validateToken() niet gebruiken...
        switchMap((user: IUser | undefined) => {
          if (user) {
            console.log('User found in local storage')
            this.currentUser$.next(user)
            // return this.validateToken(user);
            return of(user)
          } else {
            console.log(`No current user found`)
            return of(undefined)
          }
        })
      )
      .subscribe(() => console.log('Startup auth done'))
  }

  login(email: string, password: string): Observable<IUser | undefined> {
    console.log(`login at ${this.config.apiEndpoint}auth/login`)

    return this.http
      .post<IUser>(
        `${this.config.apiEndpoint}auth/login`,
        { emailAdress: email, password: password },
        { headers: this.headers }
      )
      .pipe(
        map((data: any) => data.result),
        map((user: IUser) => {
          this.saveUserToLocalStorage(user)
          this.currentUser$.next(user)
          this.alertService.success('You have been logged in')
          return user
        }),
        catchError((error: any) => {
          console.log('error:', error)
          console.log('error.message:', error.message)
          console.log('error.error.message:', error.error.message)
          this.alertService.error(error.error.message || error.message)
          return of(undefined)
        })
      )
  }

  register(userData: IUser): Observable<IUser | undefined> {
    console.log(`register at ${this.config.apiEndpoint}users`)
    console.log(userData)
    return this.http
      .post<IUser>(`${this.config.apiEndpoint}users`, userData, {
        headers: this.headers
      })
      .pipe(
        map((user) => {
          this.saveUserToLocalStorage(user)
          this.currentUser$.next(user)
          this.alertService.success('You have been registered')
          return user
        }),
        catchError((error: any) => {
          console.log('error:', error)
          console.log('error.message:', error.message)
          console.log('error.error.message:', error.error.message)
          this.alertService.error(error.error.message || error.message)
          return of(undefined)
        })
      )
  }

  logout(): void {
    this.router
      .navigate(['/'])
      .then((success) => {
        // true when canDeactivate allows us to leave the page.
        if (success) {
          console.log('logout - removing local user info')
          localStorage.removeItem(this.CURRENT_USER)
          this.currentUser$.next(undefined)
          this.alertService.success('You have been logged out.')
        } else {
          console.log('navigate result:', success)
        }
      })
      .catch((error) => console.log('not logged out!'))
  }

  getUserFromLocalStorage(): Observable<IUser | undefined> {
    const userData = localStorage.getItem(this.CURRENT_USER)
    if (userData) {
      const localUser = JSON.parse(userData)
      return of(localUser)
    } else {
      return of(undefined)
    }
  }

  private saveUserToLocalStorage(user: IUser): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user))
  }

  userMayEdit(itemUserId: number): Observable<boolean> {
    return this.currentUser$.pipe(
      map((user: IUser | undefined) => (user ? user.id === itemUserId : false))
    )
  }

  getAuthorizationToken(): string | undefined {
    const userData = localStorage.getItem(this.CURRENT_USER)
    if (userData) {
      const user: IUser = JSON.parse(userData)
      return user.token
    }
    return undefined
  }
}
