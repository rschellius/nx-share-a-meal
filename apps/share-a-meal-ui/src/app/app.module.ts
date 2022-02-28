import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LayoutComponent } from './layout/layout.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { AboutComponent } from './pages/about/about.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AuthModule } from '@cswp/auth'
import {} from '../environments/environment'
import { UtilModule } from '@cswp/util'
import { FeatureModule } from '@cswp/feature'
import { RouterModule } from '@angular/router'
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component'
import { NavbarComponent } from './shared/navbar/navbar.component'
import { FooterComponent } from './shared/footer/footer.component'
import { environment } from '../environments/environment'

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
    AuthModule.forRoot({ apiEndpoint: environment.SERVER_API_URL }),
    NgbModule,
    AppRoutingModule,
    UtilModule,
    FeatureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
