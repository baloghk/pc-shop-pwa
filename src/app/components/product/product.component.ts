import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatCardImage } from '@angular/material/card';
import { Product } from '../../shared/product';
import { NgFor } from '@angular/common';
import { CurrencyPipe } from '../../shared/currency-pipe/currency.pipe';
import { Router } from '@angular/router';
import { ProductsFirebaseService } from '../../services/firebase/products/products-firebase.service';

@Component({
  selector: 'app-product',

  imports: [
    MatCard,
    MatCardActions,
    MatCardTitle,
    MatCardImage,
    MatButton,
    NgFor,
    CurrencyPipe,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(
    private router: Router,
    private productsService: ProductsFirebaseService
  ) {}

  Products: any[] = [];

  ngOnInit() {
    this.productsService.getProductsCollection().subscribe(
      (data) => {
        this.Products = data;
        console.log('Termékek:', this.Products);
      },
      (error) => {
        console.error('Hiba a termékek betöltésekor:', error);
      }
    );
  }

  goToProduct(product: Product): void {
    this.router.navigate(['/product-page'], { state: { product } });
  }
}
