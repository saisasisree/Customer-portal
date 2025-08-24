import { Component } from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,CommonModule, MatCardModule,MatIconModule,MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(
    private router: Router,
    private route:ActivatedRoute
  ) {}

  goToInquiry() {
  this.router.navigate(['/home/inquiry']);
}

goToSalesOrder() {
  this.router.navigate(['/home/sales-order']);
}

goToDeliveries() {
  this.router.navigate(['/home/deliveries']);
}

goHome() {
  this.router.navigate(['/home']);
}

  
}

  