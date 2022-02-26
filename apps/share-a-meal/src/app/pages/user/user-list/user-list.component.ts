import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { User } from '../user.model'
import { UserService } from '../user.service'

@Component({
  selector: 'nx-share-a-meal-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users$!: Observable<User[] | null>

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users$ = this.userService.list()
  }
}
