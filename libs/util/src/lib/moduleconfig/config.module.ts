import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

/**
 * Module config options
 */
export class CustomConfig {
  apiMealEndpoint!: string
  apiIdentityEndpoint!: string
}

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [],
  exports: []
})
export class ConfigModule {
  // implement forRoot so we can inject config options
  static forRoot(config: CustomConfig): ModuleWithProviders<ConfigModule> {
    console.log('ConfigModule.forRoot' /* + config.apiIdentityEndpoint */)
    return {
      ngModule: ConfigModule,
      providers: [{ provide: CustomConfig, useValue: config }]
    }
  }
}
