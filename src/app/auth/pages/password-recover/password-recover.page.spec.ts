import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {of} from 'rxjs';
import {TranslateServiceMock} from '../../../core/mock/translate-service-mock';
import {ApiClientService} from '../../../core/services/api-client.service';
import {PasswordRecoveryFormComponent} from '../../components/password-recovery-form/password-recovery-form.component';
import {PasswordRecoveryFormService} from '../../forms/password-recovery-form.service';
import {PasswordRecoveryService} from '../../services/password-recovery.service';
import {PasswordRecoverPage} from './password-recover.page';

describe('PasswordRecoverPage', () => {
    let component: PasswordRecoverPage;
    let fixture: ComponentFixture<PasswordRecoverPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PasswordRecoverPage, TranslateServiceMock, PasswordRecoveryFormComponent],
            imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule, RouterTestingModule, TranslateModule],
            providers: [
                PasswordRecoveryService,
                PasswordRecoveryFormService,
                {provide: ApiClientService, useValue: {post: () => of()}}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PasswordRecoverPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('test nested component exists', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('app-password-recovery-form')).not.toBe(null);
        expect(compiled.querySelector('app-password-recovery-form ion-input[name="email"]')).not.toBe(null);
        expect(compiled.querySelector('app-password-recovery-form ion-button[type="submit"]')).not.toBe(null);
    });
});

// ** TODO: Need to title test
