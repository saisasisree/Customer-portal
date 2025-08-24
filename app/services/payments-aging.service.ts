import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsAgingService {
  private apiUrl = 'http://localhost:3000/payments';

  constructor(private http: HttpClient) {}

  getPaymentsAging(customerId: string): Observable<any[]> {
    return this.http.post<any>(this.apiUrl, { CustomerId: customerId }).pipe(
      map(res => res?.aging?.EtPaymentsAging?.item || [])
    );
  }
}
