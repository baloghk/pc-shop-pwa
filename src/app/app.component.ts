import { Component, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatButton } from '@angular/material/button';
import { CurrencyService } from './services/currency/currency.service';
import { CartAlertComponent } from './components/cart-alert/cart-alert.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    MatIcon,
    MatIconButton,
    MatButton,
    CartAlertComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pc-shop-pwa';
  constructor(private currencyService: CurrencyService) {}

  selectedCurrency = 'HUF';

  lastScrollTop = 0;
  navbarVisible = true;

  menuVisible = false;
  isMenuOpen = false;

  currencyMenuVisible = false;
  isCurrencyMenuOpen = false;

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

  changeCurrency(currency: string) {
    if (currency === 'HUF') {
      this.selectedCurrency = 'HUF';
      this.currencyService.setCurrency('HUF');
      this.toggleCurrencyMenu();
    }
    if (currency === 'EUR') {
      this.selectedCurrency = 'EUR';
      this.currencyService.setCurrency('EUR');
      this.toggleCurrencyMenu();
    }
    if (currency === 'USD') {
      this.selectedCurrency = 'USD';
      this.currencyService.setCurrency('USD');
      this.toggleCurrencyMenu();
    }
  }

  toggleCurrencyMenu() {
    this.currencyMenuVisible = !this.currencyMenuVisible;
    this.isCurrencyMenuOpen = this.currencyMenuVisible;
    if (this.isCurrencyMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
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

    const currencyMenuElement = document.querySelector('.currency-menu');
    const currencyMenuButton = document.querySelector('.currency');

    if (
      this.isMenuOpen &&
      !menuElement?.contains(event.target as Node) &&
      !menuButton?.contains(event.target as Node)
    ) {
      this.toggleMenu();
    }

    if (
      this.isCurrencyMenuOpen &&
      !currencyMenuElement?.contains(event.target as Node) &&
      !currencyMenuButton?.contains(event.target as Node)
    ) {
      this.toggleCurrencyMenu();
    }
  }
}
