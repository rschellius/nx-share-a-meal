import { Component, OnInit } from '@angular/core'
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
export class MealEditComponent
  extends BaseEditComponent<Meal>
  implements OnInit
{
  time: { hour: number; minutes: number } = { hour: 0, minutes: 0 }

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

  override ngOnInit(): void {
    super.ngOnInit()
    if (!this.item?.id) {
      this.item = new Meal()
    }
  }

  override onSubmit(meal: Meal) {
    // filter out uneditable properties
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { participants, createDate, updateDate, ...rest } = meal
    super.onSubmit(rest as Meal)
  }

  onDateSelect(date: any) {
    console.log(date)
  }
}
