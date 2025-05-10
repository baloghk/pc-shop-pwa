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
  constructor(private router: Router) {}

  Products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      image: 'pictures/cpu_test.png',
      brand: 'Intel',
      category: 'Számítógép alkatrész',
      subcategory: 'Processzor',
      price: 1000,
      desc: 'Description 1',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Product 2',
      image: 'pictures/cpu_test.png',
      brand: 'Ryzen',
      category: 'Számítógép alkatrész',
      subcategory: 'Processzor',
      price: 2000,
      desc: 'Description 2',
      quantity: 1,
    },
    {
      id: 3,
      name: 'Product 3',
      image: 'pictures/cpu_test.png',
      brand: 'HP',
      category: 'Notebook, Számítógép',
      subcategory: 'Gamer notebook',
      price: 500,
      desc: 'Description 2',
      quantity: 1,
    },
    {
      id: 4,
      name: 'Product 4',
      image: 'pictures/cpu_test.png',
      brand: 'Asrock',
      category: 'Számítógép alkatrész',
      subcategory: 'Alaplap',
      price: 1300,
      desc: 'Description 2',
      quantity: 1,
    },
    {
      id: 5,
      name: 'Product 5',
      image: 'pictures/cpu_test.png',
      brand: 'Intel',
      category: 'Számítógép alkatrész',
      subcategory: 'Processzor',
      price: 900,
      desc: 'Description 2',
      quantity: 1,
    },
    {
      id: 6,
      name: 'Product 6',
      image: 'pictures/cpu_test.png',
      brand: 'Intel',
      category: 'Számítógép alkatrész',
      subcategory: 'Processzor',
      price: 6200,
      desc: 'Description 2',
      quantity: 1,
    },
  ];

  goToProduct(product: Product): void {
    this.router.navigate(['/product-page'], { state: { product } });
  }
}
