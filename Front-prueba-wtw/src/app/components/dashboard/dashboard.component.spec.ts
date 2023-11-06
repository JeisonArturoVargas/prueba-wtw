import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { Router } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let locationSpy = spyOn(window.location, 'reload').and.stub();

  beforeEach(async () => {
    routerSpy.navigate.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    localStorage.clear();
    routerSpy.navigate.calls.reset();
    locationSpy.calls.reset();
  });

  it('should remove authToken and expiration from localStorage on logout', async () => {
    localStorage.setItem('authToken', '12345');
    localStorage.setItem('expiration', '2023-11-05T23:59:59.999Z');

    await component.logout();

    expect(localStorage.getItem('authToken')).toBeNull();
    expect(localStorage.getItem('expiration')).toBeNull();

  });

  it('should navigate to home on logout', async () => {
    await component.logout();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);

  });
});
