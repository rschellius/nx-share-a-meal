import {
  Injectable,
  InjectionToken,
  ModuleWithProviders,
  NgModule
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { LoggedInAuthGuard } from './auth.guards'
import { httpInterceptorProviders } from './auth.interceptor'
import { AuthService } from './auth.service'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { UtilModule } from '@cswp/util'

/**
 * Module config options
 */
// @Injectable()
export class CustomConfig {
  apiEndpoint!: string
}

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UtilModule,
    NgbModule
  ],
  providers: [LoggedInAuthGuard, AuthService, httpInterceptorProviders],
  exports: [LoginComponent, RegisterComponent]
})
export class AuthModule {
  // implement forRoot so we can inject config options
  static forRoot(config: CustomConfig): ModuleWithProviders<AuthModule> {
    console.log('AuthModule.forRoot ' + config.apiEndpoint)
    return {
      ngModule: AuthModule,
      providers: [{ provide: CustomConfig, useValue: config }]
    }
  }
}
