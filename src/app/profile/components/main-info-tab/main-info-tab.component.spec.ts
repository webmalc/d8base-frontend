import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {Injectable} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {UserInterface} from '../../../core/interfaces/user.interface';
import {PictureSelectorComponent} from '../../../shared/components/picture-selector/picture-selector.component';
import {ProfileFormService} from '../../forms/profile-form.service';
import {ProfileService} from '../../services/profile.service';
import {MainInfoTabComponent} from './main-info-tab.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MainInfoTabComponent', () => {

    let component: MainInfoTabComponent;
    let fixture: ComponentFixture<MainInfoTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MainInfoTabComponent, PictureSelectorComponent],
            imports: [IonicModule.forRoot(), ReactiveFormsModule, TranslateModule.forRoot(), HttpClientTestingModule],
            providers: [
                ProfileFormService,
                ProfileService
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
