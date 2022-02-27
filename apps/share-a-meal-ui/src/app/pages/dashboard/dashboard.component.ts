import { Component, OnInit } from '@angular/core'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'samui-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  runningMode = ''
  apiUrl = ''
  version = ''

  ngOnInit() {
    this.runningMode = environment.production ? 'production' : 'development'
    this.apiUrl = environment.SERVER_API_URL
    this.version = environment.appVersion
  }
}
