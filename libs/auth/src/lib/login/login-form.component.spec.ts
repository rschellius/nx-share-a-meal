import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LoginFormComponent } from './login-form.component'
import { AuthService } from '../../auth/auth.service'
import { Router } from '@angular/router'
import { of } from 'rxjs'
import { ReactiveFormsModule } from '@angular/forms'

//
//
//
xdescribe('LoginFormComponent', () => {
  let component: LoginFormComponent
  let fixture: ComponentFixture<LoginFormComponent>
  let routerSpy: { navigateByUrl: jasmine.Spy }
  let authServiceSpy: any // : { userIsLoggedIn: jasmine.Spy }

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl'])
    authServiceSpy = jasmine.createSpyObj('authService', [
      'login',
      'userIsLoggedIn'
    ])

    TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [ReactiveFormsModule],
      // Don't provide the real service! Provide a test-double instead!
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(LoginFormComponent)
    component = fixture.componentInstance
  }))

  afterEach(() => {
    fixture.destroy()
  })

  it('should display login screen when user has not already been logged in', async(() => {
    authServiceSpy.login.and.returnValue(of(false))
    spyOnProperty(authServiceSpy, 'userIsLoggedIn').and.returnValue(of(false))

    // component.ngOnInit()
    fixture.detectChanges()

    // The component subscribes to an asynchronous Observable in ngOnInit, therefore
    // we have to wait until that subscription returns -> .whenStable().
    // fixture.whenStable().then(() => {
    //   fixture.detectChanges()
    //   expect(component).toBeTruthy()
    // })
  }))

  xit('should not display login screen when user has already been logged in', async(() => {
    // authServiceSpy.userIsLoggedIn.and.returnValue(of(true))
    // userIsLoggedInSpy.and.returnValue(of(true))
    // component.ngOnInit()

    // The component subscribes to an asynchronous Observable in ngOnInit, therefore
    // we have to wait until that subscription returns -> .whenStable().

    fixture.whenStable().then(() => {
      fixture.detectChanges()
      expect(component).toBeTruthy()
      // Check your expectations here!
    })
  }))
})
