import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { ProductComponent } from './components/product/product.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { profileGuard } from './shared/profile-guard/profile.guard';

export const routes: Routes = [
  {
    path: 'main',
    loadComponent: () => import('./components/main-page/main-page.component').then(c => c.MainPageComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login-page/login-page.component').then(c => c.LoginPageComponent),
  },
  {
    path: 'registration',
    loadComponent: () => import('./components/registration-page/registration-page.component').then(c => c.RegistrationPageComponent),
  },
  {
    path: 'profile',
    loadComponent: () => import('./components/profile-page/profile-page.component').then(c => c.ProfilePageComponent),
    canActivate: [profileGuard],
  },
  {
    path: 'cart',
    loadComponent: () => import('./components/cart-page/cart-page.component').then(c => c.CartPageComponent),
  },
  {
    path: 'product',
    loadComponent: () => import('./components/product/product.component').then(c => c.ProductComponent),
  },
  {
    path: 'product-page',
    loadComponent: () => import('./components/product-page/product-page.component').then(c => c.ProductPageComponent),
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
