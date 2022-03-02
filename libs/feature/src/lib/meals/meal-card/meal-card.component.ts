import { Component, EventEmitter, Input, Output } from '@angular/core'
import { AuthService } from '@cswp/auth'
import { Meal } from '../meal.model'

@Component({
  selector: 'cswp-feature-meal-card',
  templateUrl: './meal-card.component.html'
})
export class MealCardComponent {
  @Input() meal!: Meal
  @Output() delete = new EventEmitter<string>()

  constructor(public authService: AuthService) {}

  onDelete(id: string | undefined): void {
    this.delete.emit(id)
  }
}
