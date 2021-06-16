import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OrderWizardStateService } from '@app/order/services/order-wizard-state.service';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { OrderPage } from './order.page';


describe('OrderPage', () => {
  let component: OrderPage;
  let fixture: ComponentFixture<OrderPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OrderPage],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [OrderWizardStateService],
      }).compileComponents();

      fixture = TestBed.createComponent(OrderPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
