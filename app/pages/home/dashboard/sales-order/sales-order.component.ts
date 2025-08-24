import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SalesOrderService } from '../../../../services/sales-order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-order',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  providers: [SalesOrderService],
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.scss']
})
export class SalesOrderComponent implements OnInit {
  salesOrders: any[] = [];
  errorMessage = '';
  loading = true;

  constructor(private salesOrderService: SalesOrderService, private router: Router) {}

  ngOnInit(): void {
    const customerId = localStorage.getItem('CustomerId') || '';
    if (!customerId) {
      this.errorMessage = 'Customer ID not found.';
      this.loading = false;
      return;
    }

    this.salesOrderService.getSalesOrders(customerId).subscribe({
      next: (data: any) => {
        this.salesOrders = data?.order?.EtSalesorder?.item || [];
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Failed to load sales orders:', err);
        this.errorMessage = 'Failed to fetch sales order data.';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/home/dashboard']);
  }
}
