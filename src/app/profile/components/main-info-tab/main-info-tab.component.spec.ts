import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {PictureSelectorComponent} from '@app/shared/components/picture-selector/picture-selector.component';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {StorageManagerMock} from 'src/testing/mocks';
import {ProfileFormService} from '../../forms/profile-form.service';
import {ContactApiService} from '../../services/contact-api.service';
import {ProfileService} from '../../services/profile.service';
import {UserContactApiService} from '../../services/user-contact-api.service';
import {MainInfoTabComponent} from './main-info-tab.component';

describe('MainInfoTabComponent', () => {

    let component: MainInfoTabComponent;
    let fixture: ComponentFixture<MainInfoTabComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MainInfoTabComponent, PictureSelectorComponent],
            imports: [IonicModule.forRoot(), ReactiveFormsModule, TranslateModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
            providers: [
                ProfileFormService,
                ProfileService,
                UserContactApiService,
                ContactApiService,
                {provide: StorageManagerService, useClass: StorageManagerMock}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MainInfoTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    xit('should be some tests');
});
