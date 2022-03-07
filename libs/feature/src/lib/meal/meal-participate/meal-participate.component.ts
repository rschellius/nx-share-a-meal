import { Component, Input, OnInit } from '@angular/core'
import { IParticipationInfo, IUser } from '@cswp/api-interfaces'
import { AuthService } from '@cswp/auth'
import { Observable } from 'rxjs'
import { Meal } from '../meal.model'
import { MealService } from '../meal.service'

@Component({
  selector: 'cswp-feature-meal-participate',
  templateUrl: './meal-participate.component.html',
  styles: ['.participate-box { background-color: lightgrey; }']
})
export class MealParticipateComponent implements OnInit {
  currentUser$?: Observable<IUser | undefined>

  @Input() mealId!: number
  meal!: Meal
  currentUserId? = 0
  currentUserIsParticipating = false
  amount!: number

  constructor(
    private mealService: MealService,
    public authService: AuthService
  ) {
    this.currentUser$ = this.authService.currentUser$
    this.currentUserId = this.authService.getUserId()
  }

  ngOnInit(): void {
    this.mealService.read(this.mealId).subscribe((meal) => {
      this.meal = meal
      const result = meal.participants.filter(
        (user) => user.id === this.currentUserId
      )
      if (result.length !== 0) {
        this.currentUserIsParticipating = true
      }
      this.amount = meal.maxAmountOfParticipants - this.meal.participants.length
    })
  }

  participate() {
    this.mealService
      .participate(this.mealId)
      .subscribe((result: IParticipationInfo) => {
        this.currentUserIsParticipating = result.currentlyParticipating
        this.amount =
          this.meal.maxAmountOfParticipants - result.currentAmountOfParticipants
      })
  }
}
