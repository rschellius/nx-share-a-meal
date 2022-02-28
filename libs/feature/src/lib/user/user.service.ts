import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { EntityService } from '@cswp/entity'
import { IUser } from '@cswp/api-interfaces'
import { ConfigService } from '@cswp/util'

@Injectable({
  providedIn: 'root'
})
export class UserService extends EntityService<IUser> {
  constructor(private config: ConfigService, http: HttpClient) {
    super(http, config.getApiEndpoint(), 'user')
    console.log('UserService ' + config.getApiEndpoint())
  }
}
