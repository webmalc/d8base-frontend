import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {StorageManagerService} from '../../../core/proxies/storage-manager.service';
import {StorageManagerMock} from '../../../core/services/token-manager.service.spec';
import {ServicePublishAgreementComponent} from './service-publish-agreement.component';

describe('ServicePublishAgreementComponent', () => {
    let component: ServicePublishAgreementComponent;
    let fixture: ComponentFixture<ServicePublishAgreementComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ServicePublishAgreementComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot(), HttpClientTestingModule],
            providers: [
                {provide: StorageManagerService, useClass: StorageManagerMock}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ServicePublishAgreementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
