import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicModule, NavController} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {ContactsAddComponent} from './contacts-add.component';

describe('ContactsAddComponent', () => {
    let component: ContactsAddComponent;
    let fixture: ComponentFixture<ContactsAddComponent>;

    beforeEach(waitForAsync(() => {
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
