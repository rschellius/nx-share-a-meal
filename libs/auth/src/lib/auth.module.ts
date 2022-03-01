import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterFormComponent } from './register/register-form.component'
import { LoginFormComponent } from './login/login-form.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { LoggedInAuthGuard } from './auth.guards'
import { httpInterceptorProviders } from './auth.interceptor'
import { AuthService } from './auth.service'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { UtilModule } from '@cswp/util'
import { SaveEditedWorkGuard } from './auth.guards'

@NgModule({
  declarations: [LoginFormComponent, RegisterFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UtilModule,
    NgbModule
  ],
  providers: [LoggedInAuthGuard, SaveEditedWorkGuard, AuthService, httpInterceptorProviders],
  exports: [LoginFormComponent, RegisterFormComponent]
})
export class AuthModule { }
