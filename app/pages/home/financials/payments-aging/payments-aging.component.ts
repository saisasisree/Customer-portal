import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PaymentsAgingService } from '../../../../services/payments-aging.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments-aging',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './payments-aging.component.html',
  styleUrls: ['./payments-aging.component.scss'],
})
export class PaymentsAgingComponent implements OnInit {
  payments: any[] = [];
  errorMessage = '';
  isLoading = false;

  constructor(
    private paymentsService: PaymentsAgingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const customerId = localStorage.getItem('CustomerId') || '';
    if (!customerId) {
      this.errorMessage = 'Customer ID not found in local storage.';
      return;
    }

    this.isLoading = true;

    this.paymentsService.getPaymentsAging(customerId).subscribe({
      next: (data) => {
        this.payments = Array.isArray(data) ? data : [data];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Payments fetch error:', err);
        this.errorMessage = 'Failed to fetch payments and aging data.';
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/home/financials']);
  }
}
