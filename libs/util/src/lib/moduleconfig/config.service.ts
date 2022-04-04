import { Injectable } from '@angular/core'
import { CustomConfig } from './config.module'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private config: CustomConfig) {
    console.log('ConfigService init')
  }

  public getConfig(): CustomConfig {
    return this.config
  }
}
