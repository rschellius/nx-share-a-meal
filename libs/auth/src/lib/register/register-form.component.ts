import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms'
import { IUser } from '@cswp/api-interfaces'

/**
 *
 */
interface IUserFormGroup extends FormGroup {
  value: IUser
  controls: {
    firstName: AbstractControl
    lastName: AbstractControl
    password: AbstractControl
    emailAdress: AbstractControl

    // phoneNumber?: AbstractControl
    // id?: number
    // roles: UserRole[]
    // isActive: boolean
    // token: string | undefined
  }
}

/**
 *
 */
@Component({
  selector: 'cswp-auth-register-form',
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent implements OnInit {
  registerForm!: IUserFormGroup
  @Output() formSubmitted = new EventEmitter<IUser>()

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      emailAdress: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ])
    }) as IUserFormGroup
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const registeredUser: IUser = this.registerForm.value
      this.formSubmitted.emit(registeredUser)
    } else {
      console.error('registerForm invalid')
    }
  }
}
