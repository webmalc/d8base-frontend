import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PasswordRecoveryFormComponent} from '@app/auth/components/password-recovery-form/password-recovery-form.component';
import {PasswordRecoveryFormService} from '@app/auth/forms/password-recovery-form.service';
import {PasswordRecoveryService} from '@app/auth/services/password-recovery.service';
import {SharedModule} from '@app/shared/shared.module';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {PasswordRecoverPageRoutingModule} from './password-recover-routing.module';
import {PasswordRecoverPage} from './password-recover.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PasswordRecoverPageRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        TranslateModule,
    ],
    declarations: [
        PasswordRecoverPage,
        PasswordRecoveryFormComponent,
    ],
    providers: [
        PasswordRecoveryFormService,
        PasswordRecoveryService,
    ],
})
export class PasswordRecoverPageModule {
}
