import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {UserManagerService} from '../../../core/services/user-manager.service';
import {PictureSelectorComponent} from '../../../shared/components/picture-selector/picture-selector.component';
import {ProfileFormService} from '../../forms/profile-form.service';
import {ContactApiService} from '../../services/contact-api.service';
import {ProfileService} from '../../services/profile.service';
import {UserContactApiService} from '../../services/user-contact-api.service';
import {MainInfoTabComponent} from './main-info-tab.component';

describe('MainInfoTabComponent', () => {

    let component: MainInfoTabComponent;
    let fixture: ComponentFixture<MainInfoTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MainInfoTabComponent, PictureSelectorComponent],
            imports: [IonicModule.forRoot(), ReactiveFormsModule, TranslateModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
            providers: [
                ProfileFormService,
                ProfileService,
                UserContactApiService,
                ContactApiService,
                UserManagerService
                // {
                //     provide: ProfileService,
                //     useClass: ProfileServiceStub,
                // }
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
