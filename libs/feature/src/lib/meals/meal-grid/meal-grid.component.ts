import { Component } from '@angular/core'
import { AuthService } from '@cswp/auth'
import { BaseListComponent } from '@cswp/entity'
import { AlertService } from '@cswp/util'
import { Meal } from '../meal.model'
import { MealService } from '../meal.service'

@Component({
  selector: 'cswp-feature-meal-grid',
  templateUrl: './meal-grid.component.html',
  styles: []
})
export class MealGridComponent extends BaseListComponent<Meal> {
  filtersAreaIsCollapsed = true

  constructor(
    mealService: MealService,
    alertService: AlertService,
    authService: AuthService
  ) {
    super(mealService, alertService, authService)
  }

  delete(movieId: string): void {
    console.log('delete ' + movieId)
  }
}
