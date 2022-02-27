import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { IUser } from '@cswp/api-interfaces'
import { UserService } from '../user.service'
import { switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Component({
  selector: 'cswp-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
  user$!: Observable<IUser>

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.userService.read(params.get('id')))
    )
  }
}
