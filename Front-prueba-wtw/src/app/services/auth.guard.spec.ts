import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let router: Router;

  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let routeSnapshotSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['']);
  const mockRouterStateSnapshot: RouterStateSnapshot = {
    url: '/',
    root: {
      queryParams: {},
      params: {},
    } as any,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy }
      ],
    });

    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should allow the authenticated user to access app', () => {
    localStorage.setItem('authToken', 'some-auth-token');

    expect(authGuard.canActivate(routeSnapshotSpy as unknown as ActivatedRouteSnapshot, mockRouterStateSnapshot)).toBe(true);
  });

  it('should not allow the unauthenticated user to access app and redirects', () => {
    localStorage.removeItem('authToken');

    let result = authGuard.canActivate(routeSnapshotSpy, mockRouterStateSnapshot);

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  afterEach(() => {
    localStorage.clear();
  });
});
