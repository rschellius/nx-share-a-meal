import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { EntityService } from '@cswp/entity'
import { IUser } from '@cswp/api-interfaces'

@Injectable({
  providedIn: 'root'
})
export class UserService extends EntityService<IUser> {
  constructor(http: HttpClient) {
    super(http, 'environment.SERVER_API_URL', 'user')
  }
}
