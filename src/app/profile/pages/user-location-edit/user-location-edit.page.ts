import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserLocation } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { ClientLocationInterface } from '@app/shared/interfaces/client-location-interface';

@Component({
  selector: 'app-user-location-edit',
  templateUrl: './user-location-edit.page.html',
  styleUrls: ['./user-location-edit.page.scss'],
})
export class UserLocationEditPage implements OnInit {

  public userLocation: UserLocation;
  private locationId: number;

  constructor(
    private readonly api: AccountsService,
    private readonly location: Location,
    private readonly route: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {
    this.locationId = parseInt(this.route.snapshot.paramMap.get('location-id'), 10);
    if (this.locationId) {
      this.api.accountsLocationsRead(this.locationId).subscribe(
        location => this.userLocation = location,
      );
    } else {
      this.userLocation = {};
    }
  }

  public save(item: UserLocation): void {
    if (this.locationId) {
      this.api.accountsLocationsUpdate({ id: this.locationId, data: item })
        .subscribe(() => this.location.back());
      return;
    }
    this.api.accountsLocationsCreate(item).subscribe(() => this.location.back());
  }

  public delete(id: number): void {
    this.api.accountsLocationsDelete(id).subscribe(() => this.location.back());
  }
}
