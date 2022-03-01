import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from '../meal.model';
import { MealService } from '../meal.service';

@Component({
  selector: 'cswp-meal-list',
  templateUrl: './meal-list.component.html',
  styles: [
  ]
})
export class MealListComponent implements OnInit {
  meals$!: Observable<Meal[] | null>
  constructor(private mealService: MealService) { }

  ngOnInit(): void {
    this.meals$ = this.mealService.list()
  }

}
