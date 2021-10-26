import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReceivedOrderManager } from '@app/orders/services';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { ReceivedOrderPageComponent } from './received-order-page.component';

describe('ReceivedOrderPageComponent', () => {
  let component: ReceivedOrderPageComponent;
  let fixture: ComponentFixture<ReceivedOrderPageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ReceivedOrderPageComponent],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [ReceivedOrderManager],
      }).compileComponents();

      fixture = TestBed.createComponent(ReceivedOrderPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
