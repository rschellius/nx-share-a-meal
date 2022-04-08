import { Component, OnInit } from '@angular/core'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'cswp-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  runningMode = ''
  apiUrl = ''
  version = ''
  apiDocsUrl = ''

  ngOnInit() {
    this.runningMode = environment.production ? 'production' : 'development'
    this.apiUrl = environment.MEAL_API_URL
    this.apiDocsUrl = environment.MEAL_DOCS_URL
    this.version = environment.appVersion
  }
}
