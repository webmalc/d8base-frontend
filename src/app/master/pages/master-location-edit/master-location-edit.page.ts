import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '@app/core/services/location.service';
import { MasterManagerService } from '@app/core/services/master-manager.service';
import { MasterLocation } from '@app/master/models/master-location';
import { MasterLocationApiService } from '@app/master/services/master-location-api.service';
import { AbstractModelEditPage } from '@app/shared/abstract/abstract-model-edit-page';
import { ClientLocationInterface } from '@app/shared/interfaces/client-location-interface';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'app-master-location-edit',
  templateUrl: './master-location-edit.page.html',
  styleUrls: ['./master-location-edit.page.scss'],
})
export class MasterLocationEditPage extends AbstractModelEditPage<MasterLocation> implements OnInit {


  constructor(
    protected readonly locationService: LocationService,
    protected readonly location: Location,
    protected readonly masterLocationApi: MasterLocationApiService,
    protected readonly route: ActivatedRoute,
    protected readonly masterManager: MasterManagerService,
  ) {
    super(route, masterLocationApi, masterManager);
  }

  public ngOnInit(): void {
    this.itemId = this.getItemId();
    if (this.itemId) {
      this.masterLocationApi.getByEntityId(this.itemId).subscribe(
        location => this.item = location,
      );
    } else {
      this.item = this.getNewModel();
    }
  }

  public transform(data: ClientLocationInterface): ClientLocationInterface {
    return plainToClass(MasterLocation, data);
  }

  protected afterApiCallback(): void {
    this.location.back();
  }

  protected getItemId(): number {
    return parseInt(this.route.snapshot.paramMap.get('location-id'), 10);
  }

  protected getNewModel(): MasterLocation {
    return new MasterLocation();
  }

  protected isUserOnly(): boolean {
    return false;
  }
}
