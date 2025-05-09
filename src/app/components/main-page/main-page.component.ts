import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgStyle, NgFor, NgClass } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-main-page',
  imports: [MatIconButton, MatIcon, NgStyle, NgFor, NgClass, MatButton],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  currentIndex = 0;

  autoplayInterval: any;
  slideIntervalTime = 5000;

  images = [
    'pictures/slide_1.jpg',
    'pictures/slide_2.jpg',
    'pictures/slide_3.jpg',
  ];

  ngOnInit() {
    this.startAutoplay();
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, this.slideIntervalTime);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  resetAutoplayTimer() {
    this.stopAutoplay();
    this.startAutoplay();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.resetAutoplayTimer();
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.resetAutoplayTimer();
  }
}
