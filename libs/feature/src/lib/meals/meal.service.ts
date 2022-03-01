import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { EntityService } from '@cswp/entity'
import { ConfigService } from '@cswp/util'
import { Meal } from './meal.model'

@Injectable({
  providedIn: 'root'
})
export class MealService extends EntityService<Meal> {
  constructor(private configService: ConfigService, http: HttpClient) {
    super(http, configService.getConfig().apiEndpoint, 'meal')
  }
}
