import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { EntityService } from '@cswp/entity'
// import { CustomConfig } from '../feature.module.ts'
import { Studio } from './studio.model'

@Injectable({
  providedIn: 'root'
})
export class StudioService extends EntityService<Studio> {
  // constructor(private config: CustomConfig, http: HttpClient) {
  //   super(http, config.apiEndpoint, 'studio')
  // }
}
