import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { IUser, ILoginFormData } from '@cswp/api-interfaces'
import { AuthService } from '@cswp/auth'
import { Subscription } from 'rxjs'

@Component({
  selector: 'cswp-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
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

  onFormSubmitted(formData: ILoginFormData): void {
    console.log(formData.emailAdress, formData.password)
    this.authService.login(formData).subscribe((user: IUser | undefined) => {
      if (user) {
        console.log('Logged in')
        this.router.navigate(['/'])
      }
      // this.submitted = false
    })
  }
}
