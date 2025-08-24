import { Component, OnInit } from '@angular/core';
import { OverallSalesService } from '../../../../services/overall-sales.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overall-sales',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './overall-sales.component.html',
  styleUrls: ['./overall-sales.component.scss']
})
export class OverallSalesComponent implements OnInit {
  summary: any = null;
  errorMessage = '';
  isLoading = false;

  constructor(
    private overallSalesService: OverallSalesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const customerId = localStorage.getItem('CustomerId') || '';
    if (!customerId) {
      this.errorMessage = 'No CustomerId found in localStorage';
      return;
    }

    this.isLoading = true;

    this.overallSalesService.getSalesSummary(customerId).subscribe({
      next: (data) => {
        this.summary = data;
        this.isLoading = false;
        console.log('Overall Sales:', this.summary);
      },
      error: (err) => {
        console.error('Error fetching sales summary:', err);
        this.errorMessage = 'Failed to fetch sales summary';
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/home/financials']);
  }
}
