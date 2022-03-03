import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '@cswp/auth'
import { BaseEditComponent } from '@cswp/entity'
import { AlertService } from '@cswp/util'
import { Meal } from '../meal.model'
import { MealService } from '../meal.service'

@Component({
  selector: 'cswp-feature-meal-edit',
  templateUrl: './meal-edit.component.html'
})
export class MealEditComponent extends BaseEditComponent<Meal> {
  constructor(
    private mealService: MealService,
    alertService: AlertService,
    authService: AuthService,
    route: ActivatedRoute,
    router: Router
  ) {
    super(mealService, alertService, authService, route, router)
    super.title = 'Maaltijd'
  }

  override onSubmit(meal: Meal) {
    // filter out uneditable properties
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { participants, createDate, updateDate, ...rest } = meal
    super.onSubmit(rest as Meal)
  }
}
