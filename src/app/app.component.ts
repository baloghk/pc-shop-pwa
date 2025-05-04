import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink,MatIcon, MatIconButton, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pc-shop-pwa';

  lastScrollTop = 0;
  navbarVisible = true;
  menuVisible = false;
  isMenuOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop <= 0) {
      this.navbarVisible = true;
    } else if (scrollTop > this.lastScrollTop) {
      this.navbarVisible = false;
    } else {
      this.navbarVisible = true;
    }

    this.lastScrollTop = scrollTop;
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
    this.isMenuOpen = this.menuVisible;
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const menuElement = document.querySelector('.menu');
    const menuButton = document.querySelector('.menu_btn');
    
    if (this.isMenuOpen && 
        !menuElement?.contains(event.target as Node) && 
        !menuButton?.contains(event.target as Node)) {
      this.toggleMenu();
    }
  }
}
