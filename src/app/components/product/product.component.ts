import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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
export class ProductComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsFirebaseService
  ) {}

  private queryParamSubscription: Subscription | undefined;
  Products: any[] = [];

  ngOnInit() {
    this.queryParamSubscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        const category = params['category'] || '';
        this.productsService.getProductsByCategory(category).subscribe({
          next: (data) => {
            this.Products = data;
            console.log('Termékek:', this.Products);
          },
          error: (error) => {
            console.error('Hiba a termékek betöltésekor:', error);
          },
          complete: () => {
            console.log('Lekérés befejezve.');
          },
        });
      }
    );
  }

  ngOnDestroy(): void {
    if (this.queryParamSubscription) {
      this.queryParamSubscription.unsubscribe();
    }
  }

  goToProduct(product: Product): void {
    this.router.navigate(['/product-page'], { state: { product } });
  }
}
