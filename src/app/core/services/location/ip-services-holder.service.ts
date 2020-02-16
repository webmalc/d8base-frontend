import { Injectable } from '@angular/core';
import {IpApiService} from './ip-api.service';
import {IpDataService} from './ip-data.service';
import {IpnfDataService} from './ipnf-data.service';
import {IpServiceInterface} from '@app/auth/interfaces/location/ip-service.interface';

@Injectable()
export class IpServicesHolderService {

  constructor(
      private ipApi: IpApiService,
      private ipData: IpDataService,
      private ipNf: IpnfDataService
  ) { }

  get list(): IpServiceInterface[] {
    return [
        this.ipApi,
        this.ipData,
        this.ipNf
    ];
  }
}
