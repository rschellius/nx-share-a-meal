import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from '../../auth/auth.service'
import { User } from '../../pages/user/user.model'

@Component({
  selector: 'cswp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() title!: string
  isNavbarCollapsed = true
  loggedInUser$!: Observable<User | undefined>

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$
  }

  logout(): void {
    this.authService.logout()
  }
}
