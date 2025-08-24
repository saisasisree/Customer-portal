import { Component, OnInit } from '@angular/core';
import { InquiryService } from '../../../../services/inquiry.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inquiry',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss']
})
export class InquiryComponent implements OnInit {
  inquiries: any[] = [];
  errorMessage = '';
  loading = true;

  constructor(private inquiryService: InquiryService, private router: Router) {}

  ngOnInit(): void {
    const customerId = localStorage.getItem('CustomerId');
    if (customerId) {
      this.inquiryService.getInquiries(customerId).subscribe({
        next: (data: any) => {
          this.inquiries = Array.isArray(data) ? data : [data];
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error fetching inquiries:', err);
          this.errorMessage = 'Failed to fetch inquiry data.';
          this.loading = false;
        }
      });
    } else {
      this.errorMessage = 'Customer ID not found in local storage.';
      this.loading = false;
    }
  }

  goBack(): void {
    this.router.navigate(['/home/dashboard']);
  }
}
