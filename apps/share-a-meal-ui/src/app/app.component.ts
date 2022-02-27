import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'samui-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  ngOnInit() {
    console.log('AppComponent geladen')
  }
}
