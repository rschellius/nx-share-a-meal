import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

/**
 * Module config options
 *
 * Add your own endpoints when you need them.
 */
export class CustomConfig {
  mealApiEndpoint!: string
  userApiEndpoint!: string
  authApiEndpoint!: string
}

/**
 * ConfigModule
 * Enables setting a configuration in Angular Modules.
 *
 * Usage:
 * imports: [
 *   ConfigModule.forRoot({
 *     authApiEndpoint: environment.AUTH_API_URL,
 *     mealApiEndpoint: environment.MEAL_API_URL,
 *     userApiEndpoint: environment.USER_API_URL
 *   }),
 *   ...]
 */
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
