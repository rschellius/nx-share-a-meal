import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
// import { SharedModule } from '../../shared/shared.module'
import * as fromComponents from '.'
import { HttpClientModule } from '@angular/common/http'

const routes: Routes = [
  {
    path: '',
    component: fromComponents.UserLayoutComponent,
    children: [
      {
        path: ':id',
        pathMatch: 'full',
        component: fromComponents.UserDetailComponent
      }
    ]
  }
]

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
    // SharedModule
  ]
})
export class UserModule {}
