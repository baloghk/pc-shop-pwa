import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgIf } from '@angular/common';
import { OrderFirebaseService } from '../../services/firebase/orders/order-firebase.service';
import { Product } from '../../shared/product';
import { Router } from '@angular/router';
import { ManagementService } from '../../services/management/management.service';
import { UserProfile } from '../../shared/user';
import { Shipping } from '../../shared/shipping';
import { AuthFirebaseService } from '../../services/firebase/authorization/auth-firebase.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCheckboxModule,
    NgIf,
  ],
})
export class OrderPageComponent {
  orderForm: FormGroup;
  user?: UserProfile;
  shipping?: Shipping;
  isDelivery: boolean = false;
  Products: Product[] = [];
  totalPrice: number = 0;

  ngOnInit() {
    const state = history.state;
    if (state && state.products && state.totalPrice) {
      this.Products = state.products;
      this.totalPrice = state.totalPrice;
    } else {
      console.error('Products not found in state');
    }
    this.authService.getUserProfile().subscribe((profile) => {
      this.user = profile || undefined;
    });
  }

  constructor(
    private fb: FormBuilder,
    private orderService: OrderFirebaseService,
    private router: Router,
    private managementService: ManagementService,
    private authService: AuthFirebaseService
  ) {
    this.orderForm = this.fb.group({
      forename: ['', Validators.required],
      surname: ['', Validators.required],
      country: ['', Validators.required],
      postal: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      deliveryMethod: ['pickup', Validators.required],
      paymentMethod: ['card', Validators.required],
      comment: [''],
      deliveryStreet: [''],
      deliveryCity: [''],
      deliveryZip: [''],
      acceptTerms: [false, Validators.requiredTrue],
    });
    const navigation = this.router.getCurrentNavigation();
    this.Products = navigation?.extras.state?.['products'];
    this.totalPrice = navigation?.extras.state?.['totalPrice'];
  }

  onDeliveryChange(method: string): void {
    this.isDelivery = method === 'delivery';
    if (!this.isDelivery) {
      this.orderForm.patchValue({
        deliveryStreet: '',
        deliveryCity: '',
        deliveryZip: '',
      });
    } else {
      this.orderForm.patchValue({
        deliveryStreet: this.orderForm.get('street')?.value,
        deliveryCity: this.orderForm.get('city')?.value,
        deliveryZip: this.orderForm.get('postal')?.value,
      });
    }
  }

  onOrder(): void {
    if (this.managementService.getProductCount() === 0) {
      alert('A kosár üres!');
      return;
    }
    if (!this.orderForm.valid) {
      Object.values(this.orderForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }
    const orderData = this.orderForm.value;

    if (this.isDelivery) {
      this.shipping = {
        country: orderData.country,
        postalCode: orderData.deliveryZip,
        city: orderData.deliveryCity,
        address: orderData.deliveryStreet,
        phone: orderData.phone,
      };
    } else {
      this.shipping = undefined;
    }

    this.orderService
      .createOrder(
        orderData.email,
        this.Products,
        this.totalPrice,
        this.user,
        this.shipping,
        orderData.comment
      )
      .then(() => {
        alert('Rendelés sikeresen leadva!');
        this.managementService.clearCart();
        this.router.navigate(['/main']);
      })
      .catch((error) => {
        console.error('Hiba történt a rendelés leadásakor:', error);
        alert('Hiba történt a rendelés leadásakor. Kérjük, próbálja újra.');
      });
  }
}
