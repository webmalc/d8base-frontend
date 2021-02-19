import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfessionalsApiCache, ServicesApiCache } from '@app/core/services/cache';
import { ServicesApiService } from '@app/core/services/services-api.service';
import { SentOrderStatusController } from '@app/my-orders/services';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SentOrderListItemComponent } from './sent-order-list-item.component';

describe('SentOrderListItemComponent', () => {
  let component: SentOrderListItemComponent;
  let fixture: ComponentFixture<SentOrderListItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SentOrderListItemComponent],
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        ServicesApiService,
        ServicesApiCache,
        SentOrderStatusController,
        ProfessionalsApiCache,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SentOrderListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
