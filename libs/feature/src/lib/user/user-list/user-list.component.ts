import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { IUser } from '@cswp/api-interfaces'
import { UserService } from '../user.service'

@Component({
  selector: 'cswp-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users$!: Observable<IUser[] | null>

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users$ = this.userService.list()
  }
}
