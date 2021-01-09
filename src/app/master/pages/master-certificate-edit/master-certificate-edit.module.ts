import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CertificateEditComponent} from '@app/master/components/certificate-edit/certificate-edit.component';
import {SharedModule} from '@app/shared/shared.module';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {MasterCertificateEditPageRoutingModule} from './master-certificate-edit-routing.module';
import {MasterCertificateEditPage} from './master-certificate-edit.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MasterCertificateEditPageRoutingModule,
        TranslateModule,
        SharedModule,
    ],
    declarations: [MasterCertificateEditPage, CertificateEditComponent],
})
export class MasterCertificateEditPageModule {
}
