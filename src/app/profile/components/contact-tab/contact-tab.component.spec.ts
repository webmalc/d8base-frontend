import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ContactTabComponent} from './contact-tab.component';
import {ContactsTabComponent as SharedContactsTabComponent} from '../../../shared/components/contacts-tab/contacts-tab.component';
import {UserContactApiService} from '../../services/user-contact-api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ContactsTabFormService} from '../../../shared/forms/contacts-tab-form.service';
import {ReactiveFormsModule} from '@angular/forms';

describe('ContactTabComponent', () => {
    let component: ContactTabComponent;
    let fixture: ComponentFixture<ContactTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ContactTabComponent, SharedContactsTabComponent],
            imports: [IonicModule.forRoot(), HttpClientTestingModule, ReactiveFormsModule],
            providers: [
                UserContactApiService,
                ContactsTabFormService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ContactTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    xit('should be some tests');
});
