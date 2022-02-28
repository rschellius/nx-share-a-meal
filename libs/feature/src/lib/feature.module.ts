import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { UtilModule } from '@cswp/util'

/**
 * Module config options
 */
export class CustomConfig {
  apiEndpoint!: string
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UtilModule,
    NgbModule
  ],
  providers: [],
  exports: []
})
export class FeatureModule {
  // implement forRoot so we can inject config options
  static forRoot(config: CustomConfig): ModuleWithProviders<FeatureModule> {
    console.log('FeatureModule.forRoot ' + config.apiEndpoint)
    return {
      ngModule: FeatureModule,
      providers: [{ provide: CustomConfig, useValue: config }]
    }
  }
}
