import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../shared/product';
import { MatButton } from '@angular/material/button';
import { ManagementService } from '../../services/management/management.service';
import { CurrencyPipe } from '../../shared/currency-pipe/currency.pipe';
import { MatIcon } from '@angular/material/icon';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-product-page',
  imports: [MatButton, CurrencyPipe, MatIcon, NgFor, RouterModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  product: Product;

  pickupDate = new Date(
    new Date().setDate(new Date().getDate() + 3)
  ).toLocaleDateString('hu-HU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
  });
  shippingDate = new Date(
    new Date().setDate(new Date().getDate() + 5)
  ).toLocaleDateString('hu-HU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
  });

  constructor(
    private router: Router,
    public managementService: ManagementService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras.state?.['product'];
  }

  ngOnInit() {
    const state = history.state;
    if (state && state.product) {
      this.product = state.product;
    } else {
      console.error('Product not found in state');
    }
  }

  alert() {
    alert('A termék a kosárba került!');
  }
}
