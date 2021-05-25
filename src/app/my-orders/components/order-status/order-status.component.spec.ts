import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderStatusComponent } from '@app/my-orders/components';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

describe('OrderStatusComponent', () => {
  let component: OrderStatusComponent;
  let fixture: ComponentFixture<OrderStatusComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OrderStatusComponent],
        imports: [...RootModules(), ComponentTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(OrderStatusComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
