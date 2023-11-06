import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a GET request', () => {
    const testData = { foo: 'bar' };
    service.get('/test').subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/test`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should send a POST request', () => {
    const testData = { foo: 'bar' };
    service.post('/test', testData).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/test`);
    expect(req.request.method).toBe('POST');
    req.flush(testData);
  });

  // Similar tests would be written for put() and delete() methods

  it('should add Authorization header', () => {
    const token = 'some-token';
    localStorage.setItem('user', JSON.stringify({ stsTokenManager: { accessToken: token } }));

    service.setBearerToken();

    service.get('/test').subscribe();

    const req = httpMock.expectOne(`${environment.baseUrl}/test`);
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    req.flush({});

    localStorage.removeItem('user'); // Clean up local storage
  });
});
