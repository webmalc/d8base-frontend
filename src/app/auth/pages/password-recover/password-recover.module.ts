import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { PasswordRecoveryFormComponent } from './components/password-recovery-form/password-recovery-form.component';
import { PasswordRecoveryService } from './services/password-recovery.service';
import { PasswordRecoverPage } from './pages/password-recover.page';
import { PasswordRecoverPageRoutingModule } from './password-recover-routing.module';

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
  declarations: [PasswordRecoverPage, PasswordRecoveryFormComponent],
  providers: [PasswordRecoveryService],
})
export class PasswordRecoverPageModule {}
