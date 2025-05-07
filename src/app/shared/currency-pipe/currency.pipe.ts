import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { CurrencyService } from '../../services/currency/currency.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'currency',
  pure: false,
})
export class CurrencyPipe implements PipeTransform, OnDestroy {
  private selectedCurrency: string = 'HUF';
  private subscription: Subscription;

  constructor(private currencyService: CurrencyService) {
    this.subscription = this.currencyService.selectedCurrency$.subscribe(
      (currency) => {
        this.selectedCurrency = currency;
      }
    );
  }

  transform(value: number): string {
    if (typeof value === 'number') {
      let convertedValue = value;
      let symbol = '';

      switch (this.selectedCurrency) {
        case 'USD':
          convertedValue = value / 307;
          symbol = '$';
          break;
        case 'EUR':
          convertedValue = value / 355;
          symbol = '€';
          break;
        case 'HUF':
        default:
          symbol = 'Ft';
          break;
      }

      const formattedValue = new Intl.NumberFormat('hu-HU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(convertedValue);

      return this.selectedCurrency === 'HUF'
        ? `${formattedValue} ${symbol}`
        : `${formattedValue} ${symbol}`;
    }
    return String(value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
