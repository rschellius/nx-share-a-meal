import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { UtilModule } from '@cswp/util'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoggedInAuthGuard, SaveEditedWorkGuard } from '@cswp/auth'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealDetailComponent } from './meal-detail/meal-detail.component';
import { MealEditComponent } from './meal-edit/meal-edit.component'
import { EntityModule } from '@cswp/entity'

const routes: Routes = [
  {
    path: '', pathMatch: 'full',
    component: MealListComponent
  },
  {
    path: 'new',
    pathMatch: 'full',
    canActivate: [LoggedInAuthGuard],
    canDeactivate: [SaveEditedWorkGuard],
    component: MealEditComponent
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: MealDetailComponent
  },
  {
    path: ':id/edit',
    pathMatch: 'full',
    canActivate: [LoggedInAuthGuard],
    canDeactivate: [SaveEditedWorkGuard],
    component: MealEditComponent
  }
]

@NgModule({
  declarations: [
    MealListComponent,
    MealDetailComponent,
    MealEditComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes),
    UtilModule,
    EntityModule
  ]
})
export class MealsModule { }
