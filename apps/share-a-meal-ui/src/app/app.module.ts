import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LayoutComponent } from './layout/layout.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component'
import { AboutComponent } from './pages/about/about.component'
import { SharedModule } from './shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoggedInAuthGuard, SaveEditedWorkGuard } from './auth/auth.guards'
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { httpInterceptorProviders } from './auth/auth.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule
  ],
  providers: [LoggedInAuthGuard, SaveEditedWorkGuard, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
