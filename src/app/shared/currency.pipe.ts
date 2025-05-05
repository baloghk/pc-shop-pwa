import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value === 'number') {
      const currency = args[0] || 'USD';
      return new Intl.NumberFormat('hu-HU', {
        style: 'currency',
        currency: currency as string,
      }).format(value);
    }
    return value;
  }
}
