import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavBranch, NavParams, NavPath } from '@app/core/constants/navigation.constants';
import { Master } from '@app/core/models/master';
import { MasterManagerService } from '@app/core/services/managers/master-manager.service';
import { MasterApiService } from '@app/professional/services/master-api.service';
import { AbstractModelEditPage } from '@app/shared/abstract/abstract-model-edit-page';

@Component({
  selector: 'app-master-edit-page',
  templateUrl: './master-edit.page.html',
  styleUrls: ['./master-edit.page.scss'],
})
export class MasterEditPage extends AbstractModelEditPage<Master> {
  public professionalProfileUrl = `/${NavPath.Professional}/${NavBranch.MyProfile}`;

  constructor(
    protected readonly api: MasterApiService,
    protected readonly route: ActivatedRoute,
    protected readonly masterManager: MasterManagerService,
    protected readonly router: Router,
  ) {
    super(route, api, masterManager);
  }

  protected afterApiCallback(master?: Master): void {
    this.router.navigateByUrl(this.professionalProfileUrl);
  }

  protected getItemId(): number {
    return parseInt(this.route.snapshot.paramMap.get(NavParams.MasterId), 10);
  }

  protected getNewModel(): Master {
    return new Master();
  }

  protected isUserOnly(): boolean {
    return true;
  }
}
