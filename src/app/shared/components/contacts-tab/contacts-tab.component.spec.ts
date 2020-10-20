import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ContactsTabFormService} from '../../forms/contacts-tab-form.service';
import {ContactsTabComponent} from './contacts-tab.component';

describe('SharedContactsTabComponent', () => {
    let component: ContactsTabComponent;
    let fixture: ComponentFixture<ContactsTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ContactsTabComponent],
            imports: [IonicModule.forRoot(), ReactiveFormsModule, HttpClientTestingModule],
            providers: [
                ContactsTabFormService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ContactsTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    xit('should be some tests');
});
