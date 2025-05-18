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
  isDelivery: boolean = false;

  constructor(private fb: FormBuilder) {
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
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      console.log('Order submitted:', orderData);
      alert('Rendelés sikeresen leadva!');
      this.orderForm.reset();
      this.orderForm.patchValue({
        deliveryMethod: 'pickup',
        paymentMethod: 'card',
      });
      this.isDelivery = false;
    } else {
      Object.keys(this.orderForm.controls).forEach((key) => {
        const control = this.orderForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
