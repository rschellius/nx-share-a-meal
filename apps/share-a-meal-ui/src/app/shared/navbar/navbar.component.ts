import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from '@cswp/auth'
import { IUser } from '@cswp/api-interfaces'

@Component({
  selector: 'cswp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
// implements OnInit
export class NavbarComponent implements OnInit {
  @Input() title!: string
  isNavbarCollapsed = true
  loggedInUser$!: Observable<IUser | undefined>

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$
  }

  logout(): void {
    this.authService.logout()
  }
}
