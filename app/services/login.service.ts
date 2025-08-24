import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(data: { CustomerId: string; Passcode: string }) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
}
