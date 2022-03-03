import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '@cswp/auth'
import { BaseDetailComponent } from '@cswp/entity'
import { Meal } from '../meal.model'
import { MealService } from '../meal.service'

@Component({
  selector: 'cswp-feature-meal-detail',
  templateUrl: './meal-detail.component.html',
  styles: []
})
export class MealDetailComponent extends BaseDetailComponent<Meal> {
  constructor(
    private mealService: MealService,
    public authService: AuthService,
    route: ActivatedRoute
  ) {
    super(mealService, route)
  }
}
