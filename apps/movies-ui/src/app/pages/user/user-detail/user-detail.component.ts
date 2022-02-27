import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { User } from '../user.model'
import { UserService } from '../user.service'
import { switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Component({
  selector: 'movies-ui-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
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
