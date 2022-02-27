import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LayoutComponent } from './layout/layout.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { AboutComponent } from './pages/about/about.component'
import { SharedModule } from './shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AuthModule } from '@cswp/auth'
import {} from '../environments/environment'
import { UtilModule } from '@cswp/util'
import { FeatureModule } from '@cswp/feature'

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    UtilModule,
    FeatureModule,
    AuthModule.forRoot({ apiEndpoint: 'hier moet de server url!' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
