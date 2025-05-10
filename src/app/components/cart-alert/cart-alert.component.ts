import { Component } from '@angular/core';
import { ManagementService } from '../../services/management/management.service';

@Component({
  selector: 'app-cart-alert',
  imports: [],
  templateUrl: './cart-alert.component.html',
  styleUrl: './cart-alert.component.scss',
})
export class CartAlertComponent {
  productCount: number = 0;

  constructor(private managementService: ManagementService) {}

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
