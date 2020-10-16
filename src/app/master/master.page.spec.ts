import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {StorageManagerService} from '../core/proxies/storage-manager.service';
import {StorageManagerMock} from '../core/services/token-manager.service.spec';
import {MasterPage} from './master.page';
import {ReviewsReadonlyApiService} from './services/reviews-readonly-api.service';

describe('MasterPage', () => {
    let component: MasterPage;
    let fixture: ComponentFixture<MasterPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot()],
            declarations: [MasterPage],
            providers: [
                {provide: StorageManagerService, useClass: StorageManagerMock},
                ReviewsReadonlyApiService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MasterPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    xit('should be some tests');
});
