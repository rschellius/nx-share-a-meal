import { Component } from '@angular/core'

@Component({
  selector: 'cswp-user-layout',
  template: `
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a routerLink="/dashboard">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Users</li>
      </ol>
    </nav>

    <div class="row">
      <div class="col">
        <button class="btn btn-primary"><a routerLink="/users/new">Nieuw</a></button>
        <cswp-user-list></cswp-user-list>
      </div>
      <div class="col">
      <button class="btn btn-primary"><a routerLink="edit">Edit</a></button>
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class UserLayoutComponent { }
