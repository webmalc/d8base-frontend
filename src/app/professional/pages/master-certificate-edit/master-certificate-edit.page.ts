import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterManagerService } from '@app/core/services/managers/master-manager.service';
import { Certificate } from '@app/professional/models/certificate';
import { CertificatesApiService } from '@app/professional/services/certificates-api.service';
import { AbstractModelEditPage } from '@app/shared/abstract/abstract-model-edit-page';

@Component({
  selector: 'app-master-certificate-edit',
  templateUrl: './master-certificate-edit.page.html',
  styleUrls: ['./master-certificate-edit.page.scss'],
})
export class MasterCertificateEditPage extends AbstractModelEditPage<Certificate> {
  constructor(
    protected readonly route: ActivatedRoute,
    protected readonly location: Location,
    protected readonly api: CertificatesApiService,
    protected readonly masterManager: MasterManagerService,
  ) {
    super(route, api, masterManager);
  }

  protected afterApiCallback(): void {
    this.location.back();
  }

  protected getItemId(): number {
    return parseInt(this.route.snapshot.paramMap.get('certificate-id'), 10);
  }

  protected getNewModel(): Certificate {
    return new Certificate();
  }

  protected isUserOnly(): boolean {
    return false;
  }
}
