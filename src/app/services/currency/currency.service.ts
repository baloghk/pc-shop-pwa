import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private selectedCurrency = new BehaviorSubject<string>('HUF');
  selectedCurrency$ = this.selectedCurrency.asObservable();

  setCurrency(currency: string): void {
    this.selectedCurrency.next(currency);
  }

  getCurrency(): string {
    return this.selectedCurrency.getValue();
  }
}
