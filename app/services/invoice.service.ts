import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getInvoices(customerId: string): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/invoice`, { ICustomer: customerId }).pipe(
map(res => res?.invo?.EInvoices?.item || [])
    );
  }

  getInvoiceDetails(customerId: string, documentNumber: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/invoiceforms`, {
      PCustId: customerId,
      PDocNo: documentNumber
    }).pipe(
map(res => res?.invo?.EInvoices?.item || [])
    );
  }

  getInvoicePdf(customerId: string, documentNumber: string): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/invoice-pdf`, {
      customerId: customerId,
      docNo: documentNumber
    }, {
      responseType: 'blob'
    });
  }
}