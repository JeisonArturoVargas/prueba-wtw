import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  endPoint: string;

  constructor(private apiService: ApiService) {
    this.endPoint = 'user';

  }

  public createUser(userData: any) {
    return this.apiService.post(this.endPoint + '/sing-in', userData);
  }

  public loginUser(userLogin: any) {
    return this.apiService.post(this.endPoint + '/login', userLogin);
  }
}
