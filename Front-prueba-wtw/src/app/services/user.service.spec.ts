import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { ApiService } from './api.service';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['post']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: ApiService, useValue: spy }
      ],
    });

    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post user data when createUser is called', () => {
    const userData = { /* ...user data... */ };
    service.createUser(userData);


    expect(apiServiceSpy.post.calls.any()).toBeTrue();
    const req = apiServiceSpy.post.calls.mostRecent().args;
    expect(req[0]).toBe(service.endPoint + '/sing-in');
    expect(req[1]).toEqual(userData);
  });

  it('should post login data when loginUser is called', () => {
    const userLogin = { /* ...login data... */ };
    service.loginUser(userLogin);

    expect(apiServiceSpy.post.calls.any()).toBeTrue();
    const req = apiServiceSpy.post.calls.mostRecent().args;
    expect(req[0]).toBe(service.endPoint + '/login');
    expect(req[1]).toEqual(userLogin);
  });
});
