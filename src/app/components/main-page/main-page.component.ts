import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-main-page',
  imports: [MatIconButton, MatIcon],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  currentIndex = 0;

  images = [
    'pictures/slide_1.jpg',
    'pictures/slide_2.jpg',
    'pictures/slide_1.jpg',
  ];

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % 3;
  }
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + 3) % 3;
  }
}
