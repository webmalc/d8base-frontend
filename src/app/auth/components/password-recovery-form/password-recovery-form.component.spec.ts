import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {of} from 'rxjs';
import {TranslateServiceMock} from '../../../core/mock/translate-service-mock';
import {ApiClientService} from '../../../core/services/api-client.service';
import {PasswordRecoveryFormService} from '../../forms/password-recovery-form.service';
import {PasswordRecoveryService} from '../../services/password-recovery.service';
import {PasswordRecoveryFormComponent} from './password-recovery-form.component';

describe('PasswordRecoveryFormComponent', () => {
    let component: PasswordRecoveryFormComponent;
    let fixture: ComponentFixture<PasswordRecoveryFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PasswordRecoveryFormComponent, TranslateServiceMock],
            imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule, RouterTestingModule, TranslateModule],
            providers: [
                PasswordRecoveryFormService,
                PasswordRecoveryService,
                {provide: ApiClientService, useValue: {post: () => of()}}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PasswordRecoveryFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
