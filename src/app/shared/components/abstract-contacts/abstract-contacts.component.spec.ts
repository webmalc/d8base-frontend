import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MasterContactsApiService} from '@app/master/services/master-contacts-api.service';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {AbstractContactsComponent} from './abstract-contacts.component';

describe('AbstractContactsComponent', () => {
    let component: AbstractContactsComponent;
    let fixture: ComponentFixture<AbstractContactsComponent>;

    beforeEach(waitForAsync(() => {
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
