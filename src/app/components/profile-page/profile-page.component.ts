import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from '../../services/firebase/authorization/auth-firebase.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-profile-page',
  imports: [MatButton],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  username: string = '';
  email: string = '';
  name: string = '';

  constructor(private authService: AuthFirebaseService) {}

  ngOnInit() {
    this.authService.getUserData().subscribe((user) => {
      if (user) {
        this.username = user.displayName || 'N/A';
        this.email = user.email || 'N/A';
        this.name = user.displayName || 'N/A';
      }
    });
  }

  onLogout() {
    this.authService
      .logout()
      .then(() => alert('Sikeres kijelentkezés!'))
      .catch((error) => alert(`Hiba: ${error.message}`));
  }
}
