import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {
  private apiUrl = 'http://localhost:3000/salesorder';

  constructor(private http: HttpClient) {}

  getSalesOrders(customerId: string): Observable<any> {
    return this.http.post(this.apiUrl, { CustomerId: customerId });
  }
}
