import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { LoggedInAuthGuard } from './auth.guards'
import { httpInterceptorProviders } from './auth.interceptor'
import { AuthService } from './auth.service'

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule],
  providers: [LoggedInAuthGuard, httpInterceptorProviders],
  exports: [AuthService]
})
export class AuthModule {}
