import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditDebitMemoService {
  private apiUrl = 'http://localhost:3000/memo';

  constructor(private http: HttpClient) {}

  getMemos(customerId: string): Observable<any[]> {
    return this.http.post<any>(this.apiUrl, { CustomerId: customerId }).pipe(
      map(res => res?.debit?.EtMemos?.item || [])
    );
  }
}
