import { Component } from '@angular/core';
import { CartNumberService } from '../../services/cart/cart-number.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-cart-alert',
  imports: [AsyncPipe],
  templateUrl: './cart-alert.component.html',
  styleUrl: './cart-alert.component.scss',
})
export class CartAlertComponent {
  constructor(public cartService: CartNumberService) {}
}
