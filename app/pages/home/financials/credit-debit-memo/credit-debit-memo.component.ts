import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreditDebitMemoService } from '../../../../services/credit-debit-memo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-debit-memo',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './credit-debit-memo.component.html',
  styleUrls: ['./credit-debit-memo.component.scss'],
})
export class CreditDebitMemoComponent implements OnInit {
  memos: any[] = [];
  errorMessage = '';
  isLoading = false;

  constructor(
    private memoService: CreditDebitMemoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const customerId = localStorage.getItem('CustomerId') || '';
    if (!customerId) {
      this.errorMessage = 'Customer ID not found in local storage.';
      return;
    }

    this.isLoading = true;

    this.memoService.getMemos(customerId).subscribe({
      next: (data) => {
        this.memos = Array.isArray(data) ? data : [data];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Memo fetch error:', err);
        this.errorMessage = 'Failed to fetch credit/debit memo data.';
        this.isLoading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/home/financials']);
  }
}
