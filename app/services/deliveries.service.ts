import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeliveriesService {
  private apiUrl = 'http://localhost:3000/listofdelivery';

  constructor(private http: HttpClient) {}

  getDeliveries(customerId: string): Observable<any[]> {
    return this.http.post<any>(this.apiUrl, { CustomerId: customerId }).pipe(
      map((res) => {
        console.log('API response in service:', res); // optional
        return res?.list?.EtDelivery?.item || [];
      })
    );
  }
}
