import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
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
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
