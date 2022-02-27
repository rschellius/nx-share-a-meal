import { Component } from '@angular/core'

@Component({
  selector: 'movies-ui-user-layout',
  template: `
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a routerLink="/dashboard">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Users</li>
      </ol>
    </nav>

    <div class="row">
      <div class="col">
        <movies-ui-user-list></movies-ui-user-list>
      </div>
      <div class="col">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class UserLayoutComponent {}
