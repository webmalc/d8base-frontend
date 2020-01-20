import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PasswordRecoverPageRoutingModule} from './password-recover-routing.module';

import {PasswordRecoverPage} from './password-recover.page';
import {PasswordRecoveryFormComponent} from '@app/auth/components/password-recovery-form/password-recovery-form.component';
import {PasswordRecoveryFormService} from '@app/auth/forms/password-recovery-form.service';
import {SharedModule} from '@app/shared/shared.module';
import {PasswordRecoveryService} from '@app/auth/services/password-recovery.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PasswordRecoverPageRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [
        PasswordRecoverPage,
        PasswordRecoveryFormComponent
    ],
    providers: [
        PasswordRecoveryFormService,
        PasswordRecoveryService
    ]
})
export class PasswordRecoverPageModule {
}
