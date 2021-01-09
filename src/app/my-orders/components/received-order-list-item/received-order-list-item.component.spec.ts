import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ServicesApiCache } from '@app/core/services/cache';

import { ReceivedOrderListItemComponent } from '@app/my-orders/components';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

describe('OrderListItemComponent', () => {
  let component: ReceivedOrderListItemComponent;
  let fixture: ComponentFixture<ReceivedOrderListItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReceivedOrderListItemComponent],
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [ServicesApiCache],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceivedOrderListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
