import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {Location} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormBuilder} from '@angular/forms';
import {ProfileService} from '../../services/profile.service';
import { UserEditComponent } from './user-edit.component';

describe('UserEditComponent', () => {
    let component: UserEditComponent;
    let fixture: ComponentFixture<UserEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ UserEditComponent ],
            imports: [IonicModule.forRoot(), HttpClientTestingModule],
            providers: [
                ProfileService,
                Location,
                FormBuilder
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UserEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
