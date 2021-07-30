import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterManagerService } from '@app/core/services/managers/master-manager.service';
import { Education } from '@app/master/models/education';
import { EducationApiService } from '@app/master/services/education-api.service';
import { AbstractModelEditPage } from '@app/shared/abstract/abstract-model-edit-page';

@Component({
  selector: 'app-master-education-edit',
  templateUrl: './master-education-edit.page.html',
  styleUrls: ['./master-education-edit.page.scss'],
})
export class MasterEducationEditPage extends AbstractModelEditPage<Education> {
  constructor(
    protected readonly educationApi: EducationApiService,
    protected readonly route: ActivatedRoute,
    protected readonly masterManager: MasterManagerService,
    protected readonly location: Location,
  ) {
    super(route, educationApi, masterManager);
  }

  protected afterApiCallback(): void {
    this.location.back();
  }

  protected getItemId(): number {
    return parseInt(this.route.snapshot.paramMap.get('education-id'), 10);
  }

  protected getNewModel(): Education {
    return new Education();
  }

  protected isUserOnly(): boolean {
    return false;
  }
}
