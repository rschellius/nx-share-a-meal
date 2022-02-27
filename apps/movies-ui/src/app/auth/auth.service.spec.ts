import { AuthService } from './auth.service';
import { of, throwError } from 'rxjs';
import { User } from '../pages/user/user.model';

/**
 * See
 * - https://angular.io/guide/testing#service-tests
 * - https://angular.io/guide/http#testing-http-requests
 */
describe('AuthService', () => {
  // De echte service die we gaan testen
  let authService: AuthService;

  // Mock services die we aanmaken voor dependency injection in de constructor
  let httpSpy: any;
  let alertServiceSpy: any;
  let authServiceSpy: any;

  const expectedUserData: User = {
    _id: 'oiuwklf89gv0iuq43k',
    name: { firstName: 'Firstname', lastName: 'Lastname' },
    emailAdress: 'user@host.com',
    token: 'some.dummy.token',
  };

  /**
   * The AuthService uses dependency injection to get other services:
   * the AlertService, Router and Http. We do not want to test these, so we use
   * service mocking. In beforeEach we set up the mocking services.
   */
  beforeEach(() => {
    alertServiceSpy = jasmine.createSpyObj('AlertService', [
      'error',
      'success',
    ]);

    httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'login',
      'register',
      'logout',
      'getUserFromLocalStorage',
      'saveUserToLocalStorage',
      'userMayEdit',
    ]);

    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    //
    // Create service via constructor
    //
    authService = new AuthService(alertServiceSpy, httpSpy, routerSpy);

    // Set service variables to initial values
    authService.currentUser$.next(undefined);
  });

  it('should have been created', () => {
    expect(authService).toBeTruthy();
  });

  it('should login a user on a call to login() with valid user information', () => {
    // Set input and expected output
    const email = 'test@dummyserver.com';
    const password = 'secret';

    // Mock functions that are called on the way
    httpSpy.post.and.returnValue(of(expectedUserData));
    authServiceSpy.saveUserToLocalStorage.and.returnValue();
    authServiceSpy.getUserFromLocalStorage.and.returnValue(
      of(expectedUserData)
    );

    const subs = authService
      .login(email, password)
      .subscribe((user: User | undefined) => {
        if (user) {
          expect(user.name.firstName).toEqual('Firstname');

          expect(alertServiceSpy.success).toHaveBeenCalled();
          expect(alertServiceSpy.error).not.toHaveBeenCalled();
          expect(alertServiceSpy.success.calls.count()).toBe(
            1,
            'success must have been called once'
          );
          expect(alertServiceSpy.error.calls.count()).toBe(
            0,
            'error method may not have been called'
          );
        }
        if (!user) {
          fail('User should have been logged in');
        }
      });

    authService
      .getUserFromLocalStorage()
      .subscribe((user: User | undefined) =>
        expect(user?.name.firstName).toEqual('Firstname')
      );

    // Clean up subscription
    subs.unsubscribe();
  });

  /**
   *
   */
  it('should NOT login with invalid user information', () => {
    // Set input and expected output
    const email = 'test@dummyserver.com';
    const password = 'secret';
    const expectedErrorResponse = {
      error: { message: 'user not found' },
      name: 'HttpErrorResponse',
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
    };

    // Mock functions that are called on the way
    // Make the http request fail; that is, return an Unauthorised message.

    // 1. er mag niet een al ingelogde gebuiker gevonden worden
    authServiceSpy.getUserFromLocalStorage.and.returnValue(of(undefined));
    // authServiceSpy.saveUserToLocalStorage.and.returnValue();
    // 2. call naar backend moet een voorspelde fout geven.
    httpSpy.post.and.returnValue(throwError(expectedErrorResponse));

    // De testcase:
    const subs = authService.login(email, password).subscribe((user) => {
      // Check de expectations:
      expect(user).toBe(undefined);
      expect(alertServiceSpy.error).toHaveBeenCalled();
      expect(alertServiceSpy.error.calls.count()).toBe(
        1,
        'alertServiceSpy method must have been called once'
      );
      expect(alertServiceSpy.success).not.toHaveBeenCalled();
      expect(alertServiceSpy.success.calls.count()).toBe(
        0,
        'alertServiceSpy method must have been called once'
      );
    });

    // Clean up subscription
    subs.unsubscribe();
  });
});
