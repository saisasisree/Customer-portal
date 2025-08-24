// src/app/services/inquiry.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private apiUrl = 'http://localhost:3000/inquiry';

  constructor(private http: HttpClient) {}

  getInquiries(customerId: string): Observable<any[]> {
    return this.http.post<any>(this.apiUrl, { CustomerId: customerId }).pipe(
      map(res => res?.dash?.EtInquiry?.item || [])
    );
  }
}
