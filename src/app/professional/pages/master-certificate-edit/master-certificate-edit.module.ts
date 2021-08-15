import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CertificateEditComponent } from '@app/professional/pages/master-certificate-edit/certificate-edit/certificate-edit.component';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MasterCertificateEditPageRoutingModule } from './master-certificate-edit-routing.module';
import { MasterCertificateEditPage } from './master-certificate-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MasterCertificateEditPageRoutingModule,
    TranslateModule,
    SharedModule,
  ],
  declarations: [MasterCertificateEditPage, CertificateEditComponent],
})
export class MasterCertificateEditPageModule {}
