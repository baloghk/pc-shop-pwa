import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from '../../services/firebase/authorization/auth-firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { PasswordChangeDialogComponent } from '../dialogs/password/password-change-dialog.component';
import { MatButton } from '@angular/material/button';
import { OrderComponent } from '../order/order.component';
import { NgIf } from '@angular/common';
import { OrderFirebaseService } from '../../services/firebase/orders/order-firebase.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  imports: [MatButton, OrderComponent, NgIf],
})
export class ProfilePageComponent implements OnInit {
  username = '';
  email = '';
  name = '';

  isOrdersEmpty = true;

  constructor(
    private authService: AuthFirebaseService,
    private dialog: MatDialog,
    private orderService: OrderFirebaseService
  ) {}

  ngOnInit() {
    this.authService.getUserProfile().subscribe((user) => {
      if (user) {
        this.name = (user.forename ?? '') + ' ' + (user.surname ?? '');
        this.email = user.email ?? 'N/A';
        this.username = user.username ?? 'N/A';
      }
    });
    this.orderService.getOrdersByUser().subscribe((orders) => {
      this.isOrdersEmpty = orders.length === 0;
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
