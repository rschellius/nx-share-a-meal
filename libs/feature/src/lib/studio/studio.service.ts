import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { EntityService } from '@cswp/entity'
import { Studio } from './studio.model'

@Injectable({
  providedIn: 'root'
})
export class StudioService extends EntityService<Studio> {
  constructor(http: HttpClient) {
    super(http, 'environment.SERVER_API_URL', 'studios')
  }
}
