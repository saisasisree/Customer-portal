import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
//import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-financials',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './financials.component.html',
  styleUrls: ['./financials.component.scss']
})
export class FinancialsComponent {
  constructor(private router: Router) {}

  goTo(path: string) {
    this.router.navigate([`/home/financials/${path}`]);
  }

  goHome() {
  this.router.navigate(['/home']);
}

}
