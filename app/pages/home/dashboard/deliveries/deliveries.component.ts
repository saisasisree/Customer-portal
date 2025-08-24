import { Component, OnInit } from '@angular/core';
import { DeliveriesService } from '../../../../services/deliveries.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-deliveries',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss'],
})
export class DeliveriesComponent implements OnInit {
  delivery: any[] = [];
  errorMessage = '';
  loading = true;

  constructor(private deliveriesService: DeliveriesService, private router: Router) {}

  ngOnInit(): void {
    const customerId = localStorage.getItem('CustomerId') || '';
    if (!customerId) {
      this.errorMessage = 'Customer ID not found.';
      this.loading = false;
      return;
    }

    this.deliveriesService.getDeliveries(customerId).subscribe({
      next: (data) => {
        this.delivery = Array.isArray(data) ? data : [data];
        this.loading = false;
      },
      error: (err) => {
        console.error('Deliveries fetch error:', err);
        this.errorMessage = 'Failed to fetch delivery data.';
        this.loading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/home/dashboard']);
  }
}
