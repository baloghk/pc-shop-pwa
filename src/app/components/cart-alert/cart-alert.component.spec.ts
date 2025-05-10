import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAlertComponent } from './cart-alert.component';

describe('CartAlertComponent', () => {
  let component: CartAlertComponent;
  let fixture: ComponentFixture<CartAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
