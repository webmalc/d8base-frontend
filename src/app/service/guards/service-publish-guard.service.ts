import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ServicePublishDataHolderService } from '@app/service/services/service-publish-data-holder.service';

@Injectable()
export class ServicePublishGuardService implements CanActivate {

  constructor(protected servicePublishDataHolder: ServicePublishDataHolderService, protected router: Router) {
  }

  public canActivate(): boolean | UrlTree {
    if (JSON.stringify(this.servicePublishDataHolder.getFullData()) === '{}') {
      return this.router.parseUrl('/service/publish/step-one');
    }

    return true;
  }
}
