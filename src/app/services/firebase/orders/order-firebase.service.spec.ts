import { TestBed } from '@angular/core/testing';

import { OrderFirebaseService } from './order-firebase.service';

describe('OrderFirebaseService', () => {
  let service: OrderFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
