import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { UserService } from './services/user.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

class MockUserService {

}
class MockMessageService {
  add(message: any) {
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ToastModule,
        ReactiveFormsModule
      ],
      declarations: [AppComponent],
      providers: [
        FormBuilder,
        { provide: UserService, useClass: MockUserService },
        { provide: MessageService, useClass: MockMessageService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#checkAuthenticationStatus', () => {
    it('should return false if there is no token', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      const result = component.checkAuthenticationStatus();
      expect(result).toBeFalse();
    });

    it('should return true if the token is not expired', () => {
      const futureDate = new Date(new Date().getTime() + 10000);
      spyOn(localStorage, 'getItem')
        .withArgs('authToken').and.returnValue('dummy-token')
        .withArgs('expiration').and.returnValue(futureDate.toISOString());
      const result = component.checkAuthenticationStatus();
      expect(result).toBeTrue();
    });

    it('should return false and remove token if the token is expired', () => {
      const pastDate = new Date(new Date().getTime() - 10000);
      spyOn(localStorage, 'getItem')
        .withArgs('authToken').and.returnValue('dummy-token')
        .withArgs('expiration').and.returnValue(pastDate.toISOString());
      const removeSpy = spyOn(localStorage, 'removeItem');

      const result = component.checkAuthenticationStatus();

      expect(result).toBeFalse();
      expect(removeSpy).toHaveBeenCalledWith('authToken');
      expect(removeSpy).toHaveBeenCalledWith('expiration');
    });
  });
});
