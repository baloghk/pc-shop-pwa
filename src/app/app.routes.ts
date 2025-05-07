import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { ProductComponent } from './components/product/product.component';
import { ProductPageComponent } from './components/product-page/product-page.component';

export const routes: Routes = [
  {
    path: 'main',
    component: MainPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'registration',
    component: RegistrationPageComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'product-page',
    component: ProductPageComponent,
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
