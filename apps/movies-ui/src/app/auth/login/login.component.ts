import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../auth/auth.service'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { User } from '../../pages/user/user.model'

@Component({
  selector: 'movies-ui-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup
  subs!: Subscription
  submitted = false

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ])
    })

    this.subs = this.authService
      .getUserFromLocalStorage()
      .subscribe((user: User | undefined) => {
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

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.submitted = true
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      this.authService
        .login(email, password)
        // .pipe(delay(1000))
        .subscribe((user) => {
          if (user) {
            console.log('Logged in')
            this.router.navigate(['/'])
          }
          this.submitted = false
        })
    } else {
      this.submitted = false
      console.error('loginForm invalid')
    }
  }
}
