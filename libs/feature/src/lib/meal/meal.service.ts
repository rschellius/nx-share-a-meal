import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { IParticipationInfo } from '@cswp/api-interfaces'
import { EntityService, httpOptions } from '@cswp/entity'
import { ConfigService } from '@cswp/util'
import { catchError, map, Observable, tap } from 'rxjs'
import { Meal } from './meal.model'

@Injectable({
  providedIn: 'root'
})
export class MealService extends EntityService<Meal> {
  constructor(private configService: ConfigService, http: HttpClient) {
    super(http, configService.getConfig().apiMealEndpoint, 'meal')
  }

  public participate(mealId: number): Observable<IParticipationInfo> {
    const endpoint = `${this.url}${this.endpoint}/${mealId}/participate`
    console.log(`participate ${endpoint}`)
    return this.http.get<any>(endpoint, httpOptions).pipe(
      map((response: any) => response.result),
      tap(console.log),
      catchError(this.handleError)
    )
  }
}
