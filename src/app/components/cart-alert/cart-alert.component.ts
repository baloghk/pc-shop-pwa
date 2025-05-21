import { Component } from '@angular/core';
import { CartNumberService } from '../../services/cart/cart-number.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart-alert',
  imports: [AsyncPipe, NgIf],
  templateUrl: './cart-alert.component.html',
  styleUrl: './cart-alert.component.scss',
})
export class CartAlertComponent {
  constructor(public cartService: CartNumberService) {}
}
