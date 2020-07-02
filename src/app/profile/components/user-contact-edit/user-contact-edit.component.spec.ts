import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {Location} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ContactApiService} from '../../services/contact-api.service';
import {UserContactApiService} from '../../services/user-contact-api.service';
import { UserContactEditComponent } from './user-contact-edit.component';

describe('UserContactEditComponent', () => {
    let component: UserContactEditComponent;
    let fixture: ComponentFixture<UserContactEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ UserContactEditComponent ],
            imports: [IonicModule.forRoot(), HttpClientTestingModule],
            providers: [
                UserContactApiService,
                ContactApiService,
                FormBuilder,
                Location,
                {provide: ActivatedRoute, useValue: {snapshot: {paramMap: {get(): string { return ''; }}}}}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UserContactEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
