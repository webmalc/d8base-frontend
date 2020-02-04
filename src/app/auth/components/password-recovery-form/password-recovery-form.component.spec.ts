import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {PasswordRecoveryFormComponent} from './password-recovery-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {TranslateServiceMock} from '../../../core/mock/translate-service-mock';
import {PasswordRecoveryFormService} from '../../forms/password-recovery-form.service';
import {PasswordRecoveryService} from '../../services/password-recovery.service';
import {ApiClientService} from '../../../core/services/api-client.service';
import {of} from 'rxjs';

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
