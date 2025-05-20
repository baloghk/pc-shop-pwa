import { Component } from '@angular/core';
import { ManagementService } from '../../services/management/management.service';
import { CartNumberService } from '../../services/cart/cart-number.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-cart-alert',
  imports: [AsyncPipe],
  templateUrl: './cart-alert.component.html',
  styleUrl: './cart-alert.component.scss',
})
export class CartAlertComponent {
  productCount: number = 0;

  constructor(
    private managementService: ManagementService,
    public cartService: CartNumberService
  ) {}

  ngOnInit(): void {
    this.updateProductCount();
  }

  ngOnChanges(): void {
    this.updateProductCount();
  }

  public updateProductCount(): void {
    this.managementService.loadProducts().then((products) => {
      this.productCount = products.reduce(
        (sum, product) => sum + (product.quantity || 0),
        0
      );
    });
  }
}
