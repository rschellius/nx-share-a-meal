import { BrowserModule } from '@angular/platform-browser'
import { NgModule, LOCALE_ID } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LayoutComponent } from './layout/layout.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { AboutComponent } from './pages/about/about.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AuthModule } from '@cswp/auth'
import { ConfigModule, UtilModule } from '@cswp/util'
import { RouterModule } from '@angular/router'
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component'
import { NavbarComponent } from './shared/navbar/navbar.component'
import { FooterComponent } from './shared/footer/footer.component'
import { environment } from '../environments/environment'
import { registerLocaleData } from '@angular/common'
import localeNl from '@angular/common/locales/nl'
import { MealModule } from '@cswp/feature'

registerLocaleData(localeNl, 'nl')

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ConfigModule.forRoot({
      authApiEndpoint: environment.AUTH_API_URL,
      mealApiEndpoint: environment.MEAL_API_URL,
      userApiEndpoint: environment.USER_API_URL
    }),
    AuthModule,
    NgbModule,
    AppRoutingModule,
    UtilModule,
    MealModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'nl' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
