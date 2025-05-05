import { Component } from '@angular/core';
import { Product } from '../../shared/product';
import { NgFor } from '@angular/common';
import { ManagementService } from '../../services/management.service';

@Component({
  selector: 'app-main-page',
  imports: [NgFor],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  constructor(public managementService: ManagementService) {}

  products: Product[] = [
    {
      name: 'Product 1',
      price: 100,
      desc: 'Description of Product 1',
    },
    {
      name: 'Product 2',
      price: 200,
      desc: 'Description of Product 2',
    },
    {
      name: 'Product 3',
      price: 300,
      desc: 'Description of Product 3',
    },
  ];
}
