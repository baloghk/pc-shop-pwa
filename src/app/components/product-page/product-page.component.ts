import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../shared/product';
import { MatButton } from '@angular/material/button';
import { ManagementService } from '../../services/management.service';

@Component({
  selector: 'app-product-page',
  imports: [MatButton],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  product: Product;
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
}
