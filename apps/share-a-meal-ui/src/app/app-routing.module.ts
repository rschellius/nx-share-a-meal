import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component'
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
      }
      // {
      //   path: 'meals',
      //   loadChildren: () =>
      //     import(/* webpackChunkName: "meals.module" */ '@cswp/feature').then(
      //       (m) => m.MealsModule,
      //       () => {
      //         throw { loadChunkError: true }
      //       }
      //     )
      // }
    ]
  },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'register', pathMatch: 'full', component: RegisterComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'dashboard' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
