import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
// import { SharedModule } from '../../shared/shared.module'
import * as fromComponents from '.'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

const routes: Routes = [
  {
    path: '',
    component: fromComponents.UserLayoutComponent,
    children: [
      {
        path: 'new',
        pathMatch: 'full',
        component: fromComponents.UserEditComponent
      },
      {
        path: ':id',
        pathMatch: 'full',
        component: fromComponents.UserDetailComponent
      },
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: fromComponents.UserEditComponent
      }
    ]
  }
]

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule
  ]
})
export class UserModule {}
