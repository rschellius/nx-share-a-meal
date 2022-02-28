import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { IUser } from '@cswp/api-interfaces'
import { AuthService } from '@cswp/auth'
import { Subscription } from 'rxjs'

@Component({
  selector: 'cswp-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {
  subs!: Subscription

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subs = this.authService
      .getUserFromLocalStorage()
      .subscribe((user: IUser | undefined) => {
        if (user) {
          console.log('User already logged in > to dashboard')
          this.router.navigate(['/'])
        }
      })
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe()
    }
  }

  onFormSubmitted(registeredUser: IUser): void {
    this.authService
      .register(registeredUser)
      .subscribe((user: IUser | undefined) => {
        if (user) {
          console.log('user = ', user)
          this.router.navigate(['/'])
        }
      })
  }
}
