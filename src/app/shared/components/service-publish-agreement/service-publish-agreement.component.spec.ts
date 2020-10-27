import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {StorageManagerMock} from 'src/testing/mocks';
import {ServicePublishAgreementComponent} from './service-publish-agreement.component';

describe('ServicePublishAgreementComponent', () => {
    let component: ServicePublishAgreementComponent;
    let fixture: ComponentFixture<ServicePublishAgreementComponent>;

    beforeEach(waitForAsync(() => {
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
