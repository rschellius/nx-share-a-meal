import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ILoginFormData } from '@cswp/api-interfaces'

@Component({
  selector: 'cswp-auth-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup
  @Output() formSubmitted = new EventEmitter<ILoginFormData>()

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ])
    })
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginFormData: ILoginFormData = {
        emailAdress: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      this.formSubmitted.emit(loginFormData)
    } else {
      console.error('loginForm invalid')
    }
  }
}
