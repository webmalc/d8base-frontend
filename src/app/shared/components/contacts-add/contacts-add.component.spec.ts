import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule, NavController} from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {ContactsAddComponent} from './contacts-add.component';

describe('ContactsAddComponent', () => {
    let component: ContactsAddComponent;
    let fixture: ComponentFixture<ContactsAddComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ContactsAddComponent],
            imports: [IonicModule.forRoot(), HttpClientTestingModule, TranslateModule.forRoot(), RouterTestingModule],
            providers: [
                NavController
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ContactsAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
