import { Injectable } from '@angular/core';
import { IpServiceInterface } from '@app/auth/interfaces/location/ip-service.interface';
import { IpApiService } from './ip-api.service';
import { IpDataService } from './ip-data.service';
import { IpnfDataService } from './ipnf-data.service';

@Injectable()
export class IpServicesHolderService {

  constructor(
    private readonly ipApi: IpApiService,
    private readonly ipData: IpDataService,
    private readonly ipNf: IpnfDataService,
  ) {
  }

  public getList(): IpServiceInterface[] {
    return [
      this.ipData,
      this.ipApi,
      this.ipNf,
    ];
  }
}
