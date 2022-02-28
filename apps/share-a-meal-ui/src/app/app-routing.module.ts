import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginUIComponent } from './auth/login-ui/login-ui.component'
import { RegisterUiComponent } from './auth/register-ui/register-ui.component'
import { LayoutComponent } from './layout/layout.component'
import { AboutComponent } from './pages/about/about.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', pathMatch: 'full', component: DashboardComponent },
      { path: 'about', pathMatch: 'full', component: AboutComponent },
      {
        path: 'users',
        loadChildren: () =>
          import(/* webpackChunkName: "user.module" */ '@cswp/feature').then(
            (m) => m.UserModule,
            () => {
              throw { loadChunkError: true }
            }
          )
      },
      {
        path: 'movies',
        loadChildren: () =>
          import(/* webpackChunkName: "movies.module" */ '@cswp/feature').then(
            (m) => m.MovieModule,
            () => {
              throw { loadChunkError: true }
            }
          )
      }
    ]
  },
  { path: 'login', pathMatch: 'full', component: LoginUIComponent },
  { path: 'register', pathMatch: 'full', component: RegisterUiComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'dashboard' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
