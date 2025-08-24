import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { InvoiceService } from '../../../../services/invoice.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent implements OnInit {
  invoices: any[] = [];
  selectedInvoice: any = null;
  invoiceDetails: any = null;
  errorMessage = '';
  pdfUrl: SafeResourceUrl | null = null;
  isLoading = false;

  constructor(
    private invoiceService: InvoiceService,
    private sanitizer: DomSanitizer,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    const customerId = localStorage.getItem('CustomerId') || '';
    if (!customerId) {
      this.errorMessage = 'Customer ID not found in local storage.';
      return;
    }

    this.isLoading = true;
    this.invoiceService.getInvoices(customerId).subscribe({
      next: (data) => {
        this.invoices = Array.isArray(data) ? data : [data];
        console.log('Invoices:', this.invoices);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Invoice fetch error:', err);
        this.errorMessage = 'Failed to fetch invoice data.';
        this.isLoading = false;
      }
    });
  }

  // viewInvoiceDetails(invoice: any): void {
  //   this.selectedInvoice = invoice;
  //   this.pdfUrl = null; // Reset PDF view
  //   this.invoiceDetails = invoice; // Use the invoice data directly as details
  //   console.log('Invoice details:', this.invoiceDetails);
  // }

  // previewInvoice(invoice: any): void {
  //   const customerId = localStorage.getItem('CustomerId') || '';
  //   this.isLoading = true;
    
  //   this.invoiceService.getInvoicePdf(customerId, invoice.Vbeln).subscribe({
  //     next: (pdfBlob) => {
  //       // Create a URL for the blob
  //       const url = URL.createObjectURL(pdfBlob);
  //       this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  //       this.isLoading = false;
  //     },
  //     error: (err) => {
  //       console.error('PDF fetch error:', err);
  //       this.errorMessage = 'Failed to fetch invoice PDF.';
  //       this.isLoading = false;
  //     }
  //   });
  // }

  downloadInvoice(invoice: any): void {
    const customerId = localStorage.getItem('CustomerId') || '';
    this.isLoading = true;
    
    this.invoiceService.getInvoicePdf(customerId, invoice.Vbeln).subscribe({
      next: (pdfBlob) => {
        // Create a download link
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Invoice-${invoice.Vbeln}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('PDF download error:', err);
        this.errorMessage = 'Failed to download invoice PDF.';
        this.isLoading = false;
      }
    });
  }
  goBack() {
  this.router.navigate(['/home/financials']);
}
}
