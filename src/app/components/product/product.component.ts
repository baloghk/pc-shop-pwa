import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatCardImage } from '@angular/material/card';
import { Product } from '../../shared/product';
import { NgFor } from '@angular/common';
import { CurrencyPipe } from '../../shared/currency.pipe';
import { RouterLink } from '@angular/router';

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
    RouterLink,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  Products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      image: 'pictures/cpu_test.png',
      price: 100,
      desc: 'Description 1',
    },
    {
      id: 2,
      name: 'Product 2',
      image: 'pictures/cpu_test.png',
      price: 200,
      desc: 'Description 2',
    },
  ];
}
