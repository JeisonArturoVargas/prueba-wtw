import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = environment.baseUrl;
  headers: { [key: string]: string; } = {};
  httpOptions = { 'headers': this.headers };

  constructor(private http: HttpClient) { }

  public addHeader(header: string, value: string) {
    this.headers[header] = value;
  }

  public setBearerToken() {
    let user = JSON.parse(localStorage.getItem('user')!);
    if (user) {

      this.addHeader('Authorization', `Bearer ${user.stsTokenManager.accessToken}`);
    }
  }

  public get(path: string) {
    return this.http.get<any>(`${this.baseUrl}${path}`, this.httpOptions);
  }

  public post(path: string, data: any) {
    return this.http.post<any>(`${this.baseUrl}${path}`, data, this.httpOptions);
  }

  public put(path: string, data: any) {
    return this.http.put<any>(`${this.baseUrl}${path}`, data, this.httpOptions);
  }

  public delete(path: string, data: any) {
    let opts = { 'headers': this.headers, 'body': data };
    return this.http.delete<any>(`${this.baseUrl}${path}`, opts);
  }
}
