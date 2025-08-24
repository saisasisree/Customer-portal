import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ProfileService } from '../../../services/profile.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router'; // <-- ✅ Add this line

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
  profile: any = null;
  errorMessage: string = '';

  // ✅ Updated constructor to include Router
  constructor(private profileService: ProfileService, private router: Router) {}

  // ✅ Add this method
  goBack(): void {
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    const customerId = localStorage.getItem('CustomerId');
    if (customerId) {
      this.profileService.getProfile(customerId).subscribe({
        next: (data) => {
          console.log('Full response:', data);
          this.profile = data?.prof?.EsProfile;
        },
        error: (err) => {
          console.error('Error fetching profile:', err);
          this.errorMessage = 'Failed to load profile data.';
        }
      });
    } else {
      this.errorMessage = 'Customer ID not found in local storage.';
    }
  }
}
