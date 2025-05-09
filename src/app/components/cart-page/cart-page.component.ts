import { Component } from '@angular/core';
import { ManagementService } from '../../services/management/management.service';
import { CurrencyPipe } from '../../shared/currency-pipe/currency.pipe';
import { NgFor, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatIconButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { Product } from '../../shared/product';

@Component({
  selector: 'app-cart-page',
  imports: [CurrencyPipe, NgFor, NgIf, MatIcon, MatButton, MatIconButton],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
  products: any[] = [];
  totalPrice: number = 0;
  isCartEmpty = false;

  pickupDate = new Date(
    new Date().setDate(new Date().getDate() + 3)
  ).toLocaleDateString('hu-HU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  shippingDate = new Date(
    new Date().setDate(new Date().getDate() + 5)
  ).toLocaleDateString('hu-HU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  constructor(
    public managementService: ManagementService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getCartItems();
  }

  async ngOnChanges(): Promise<void> {
    await this.getCartItems();
  }

  private async getCartItems(): Promise<void> {
    try {
      this.products = await this.managementService.loadProducts();
      this.totalPriceCalculation();
      if (this.products.length > 0) {
        this.isCartEmpty = false;
      } else {
        this.isCartEmpty = true;
      }
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  }

  totalPriceCalculation() {
    this.totalPrice = this.products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }

  changeQuantity(product: any, quantity: number) {
    product.quantity += quantity;
    this.totalPriceCalculation();
    this.managementService.updateProductQuantity(product.id, product.quantity);

    if (product.quantity < 1) {
      this.managementService.removeProduct(product.id);
      this.products = this.products.filter((p) => p.id !== product.id);
      this.totalPriceCalculation();
    }
  }

  clearCart() {
    this.managementService.clearCart();
    console.log('Kosár kiürítve');
    this.products = [];
    this.totalPrice = 0;
    this.isCartEmpty = true;
  }

  goToProduct(product: Product): void {
    this.router.navigate(['/product-page'], { state: { product } });
  }
}
