import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ServicesApiCache } from '@app/core/services/cache';

import { ReceivedOrderListItemComponent } from '@app/my-orders/components';
import { ReceiverOrderStatusController } from '@app/my-orders/services';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

describe('ReceivedOrderListItemComponent', () => {
  let component: ReceivedOrderListItemComponent;
  let fixture: ComponentFixture<ReceivedOrderListItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReceivedOrderListItemComponent],
      imports: [
        ...RootModules(),
        ComponentTestingModule,
      ],
      providers: [ServicesApiCache, ReceiverOrderStatusController],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceivedOrderListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
