import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ContactsTabFormService} from '../../forms/contacts-tab-form.service';
import {ContactsTabComponent} from './contacts-tab.component';

describe('SharedContactsTabComponent', () => {
    let component: ContactsTabComponent;
    let fixture: ComponentFixture<ContactsTabComponent>;

    beforeEach(waitForAsync(() => {
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
