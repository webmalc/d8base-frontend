import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfessionalCertificate } from '@app/api/models';
import { AccountsService } from '@app/api/services/accounts.service';
import { NavParams } from '@app/core/constants/navigation.constants';
import { MasterManagerService } from '@app/core/services';
import { ColumnHeaderComponent } from '@app/shared/components';

@Component({
  selector: 'app-master-certificate-edit',
  templateUrl: './master-certificate-edit.page.html',
  styleUrls: ['./master-certificate-edit.page.scss'],
})
export class MasterCertificateEditPage implements OnInit {
  @ViewChild(ColumnHeaderComponent)
  public header: ColumnHeaderComponent;

  public certificate: ProfessionalCertificate;

  constructor(
    private readonly api: AccountsService,
    private readonly route: ActivatedRoute,
    private readonly masterManager: MasterManagerService,
  ) {}

  public ngOnInit(): void {
    const certificateId = parseInt(this.route.snapshot.paramMap.get(NavParams.CertificateId), 10);
    if (certificateId) {
      this.api.accountsProfessionalCertificatesRead(certificateId).subscribe(certificate => {
        this.certificate = certificate;
      });
    } else {
      this.masterManager.getMasterList().subscribe(
        professionals =>
          (this.certificate = {
            name: '',
            organization: '',
            professional: professionals[0].id,
          }),
      );
    }
  }

  public save(data: ProfessionalCertificate): void {
    const id = this.certificate.id;
    const saveCommand = id
      ? this.api.accountsProfessionalCertificatesUpdate({ id, data })
      : this.api.accountsProfessionalCertificatesCreate(data);
    saveCommand.subscribe(() => this.header.navigateBack());
  }

  public delete(id: number): void {
    this.api.accountsProfessionalCertificatesDelete(id).subscribe(() => this.header.navigateBack());
  }
}
