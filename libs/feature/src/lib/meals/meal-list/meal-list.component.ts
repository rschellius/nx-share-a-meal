import { Component } from '@angular/core'
import { AuthService } from '@cswp/auth'
import { BaseListComponent } from '@cswp/entity'
import { AlertService } from '@cswp/util'
import { Meal } from '../meal.model'
import { MealService } from '../meal.service'

@Component({
  selector: 'cswp-feature-meal-list',
  templateUrl: './meal-list.component.html',
  styles: []
})
export class MealListComponent extends BaseListComponent<Meal> {
  constructor(
    mealService: MealService,
    alertService: AlertService,
    authService: AuthService
  ) {
    super(mealService, alertService, authService)
  }
}
