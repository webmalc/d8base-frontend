import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ServicesApiCache} from '@app/my-orders/services';
import {MasterReadonlyApiCacheService} from '@app/my-orders/services/master-readonly-api-cache.service';
import {ServicesApiService} from '@app/service/services/services-api.service';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {SentOrderListItemComponent} from './sent-order-list-item.component';

describe('SentOrderListItemComponent', () => {
    let component: SentOrderListItemComponent;
    let fixture: ComponentFixture<SentOrderListItemComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SentOrderListItemComponent],
            imports: [IonicModule.forRoot(), HttpClientTestingModule, TranslateModule.forRoot()],
            providers: [ServicesApiService, ServicesApiCache, MasterReadonlyApiCacheService]
        }).compileComponents();

        fixture = TestBed.createComponent(SentOrderListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
