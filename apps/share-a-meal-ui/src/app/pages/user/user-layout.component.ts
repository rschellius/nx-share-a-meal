import { Component } from '@angular/core'

@Component({
  selector: 'samui-user-layout',
  template: `
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a routerLink="/dashboard">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Users</li>
      </ol>
    </nav>

    <div class="row">
      <div class="col">
        <samui-user-list></samui-user-list>
      </div>
      <div class="col">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class UserLayoutComponent {}
