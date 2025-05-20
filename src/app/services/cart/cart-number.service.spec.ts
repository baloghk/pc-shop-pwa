import { TestBed } from '@angular/core/testing';

import { CartNumberService } from './cart-number.service';

describe('CartNumberService', () => {
  let service: CartNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
