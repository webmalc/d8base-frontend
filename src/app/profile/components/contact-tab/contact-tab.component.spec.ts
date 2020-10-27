import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ContactsTabFormService} from '@app/shared/forms/contacts-tab-form.service';
import {IonicModule} from '@ionic/angular';
import {ContactsTabComponent as SharedContactsTabComponent} from '../../../shared/components/contacts-tab/contacts-tab.component';
import {UserContactApiService} from '../../services/user-contact-api.service';
import {ContactTabComponent} from './contact-tab.component';

describe('ContactTabComponent', () => {
    let component: ContactTabComponent;
    let fixture: ComponentFixture<ContactTabComponent>;

    beforeEach(waitForAsync(() => {
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
