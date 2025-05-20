import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartNumberService {
  private itemsInCart = new BehaviorSubject<number>(0);
  itemsInCart$ = this.itemsInCart.asObservable();

  setQuantity(amount: number): void {
    this.itemsInCart.next(amount);
  }

  getQuantity(): number {
    return this.itemsInCart.getValue();
  }
}
