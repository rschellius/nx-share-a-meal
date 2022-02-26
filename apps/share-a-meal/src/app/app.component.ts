import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'nx-share-a-meal-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'angular-demo'

  ngOnInit() {
    console.log('AppComponent geladen')
  }
}
