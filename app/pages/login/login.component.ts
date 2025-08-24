import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';  // <-- add this

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  customerId = '';
  passcode = '';
  hidePassword = true;
  errorMessage = '';

  constructor(private router: Router, private http: HttpClient) {}  // <-- inject HttpClient

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onLogin(): void {
    const body = {
      CustomerId: this.customerId,
      Passcode: this.passcode
    };

    this.http.post<any>('http://localhost:3000/login', body).subscribe({
      next: (res) => {
        console.log('API response:', res);  // ✅ Debug log

        // Adjusting to your actual backend structure
        if (res?.result?.Status?.toUpperCase() === 'LOGIN SUCCESS') {
 localStorage.setItem('CustomerId', this.customerId); // ✅ Capital C

  this.router.navigate(['/home']);
} else {
  this.errorMessage = 'Invalid credentials.';
  alert(this.errorMessage);
}
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Something went wrong.';
        alert(this.errorMessage);
      }
    });
  }
}
