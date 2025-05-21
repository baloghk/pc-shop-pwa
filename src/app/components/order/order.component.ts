import { Component } from '@angular/core';
import { Order } from '../../shared/order';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { OrderFirebaseService } from '../../services/firebase/orders/order-firebase.service';
import { CurrencyPipe } from '../../shared/currency-pipe/currency.pipe';

@Component({
  selector: 'app-order',
  imports: [MatCardModule, MatButtonModule, MatIconModule, NgFor, CurrencyPipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  constructor(private orderService: OrderFirebaseService) {}

  Orders: Order[] = [];

  ngOnInit() {
    this.orderService.getOrdersByUser().subscribe((orders) => {
      this.Orders = orders;
    });
  }

  deleteOrder(order: Order) {
    if (!order.id) {
      console.error('Nincs rendelés azonosító');
      return;
    }
    this.orderService.deleteOrder(order.id).then(() => {
      console.log('Rendelés törölve:', order.id);
    });
  }
}
