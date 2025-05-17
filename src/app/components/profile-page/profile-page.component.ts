import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from '../../services/firebase/authorization/auth-firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { PasswordChangeDialogComponent } from '../dialogs/password/password-change-dialog.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  imports: [MatButton],
})
export class ProfilePageComponent implements OnInit {
  username = '';
  email = '';
  name = '';

  constructor(
    private authService: AuthFirebaseService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.authService.getUserProfile().subscribe((user) => {
      if (user) {
        this.name = (user.forename ?? '') + ' ' + (user.surname ?? '');
        this.email = user.email ?? 'N/A';
        this.username = user.username ?? 'N/A';
      }
    });
  }

  openChangePasswordDialog() {
    this.dialog.open(PasswordChangeDialogComponent, {
      width: 'fit-content',
    });
  }

  onLogout() {
    this.authService
      .logout()
      .then(() => alert('Sikeres kijelentkezés!'))
      .catch((error) => alert(`Hiba: ${error.message}`));
  }
}
