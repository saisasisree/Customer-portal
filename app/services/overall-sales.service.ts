import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverallSalesService {
  private apiUrl = 'http://localhost:3000/overallsales';

  constructor(private http: HttpClient) {}

  getSalesSummary(customerId: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { CustomerId: customerId }).pipe(
      map(res => res?.sales?.EtSalesSummary?.item || null)
    );
  }
}
