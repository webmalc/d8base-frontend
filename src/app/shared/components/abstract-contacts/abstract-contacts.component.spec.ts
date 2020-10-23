import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {MasterContactsApiService} from '../../../master/services/master-contacts-api.service';
import {AbstractContactsComponent} from './abstract-contacts.component';

describe('AbstractContactsComponent', () => {
    let component: AbstractContactsComponent;
    let fixture: ComponentFixture<AbstractContactsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AbstractContactsComponent],
            imports: [IonicModule.forRoot(), HttpClientTestingModule, TranslateModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(AbstractContactsComponent);
        component = fixture.componentInstance;
        component.contactsApiService = TestBed.inject(MasterContactsApiService);
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
