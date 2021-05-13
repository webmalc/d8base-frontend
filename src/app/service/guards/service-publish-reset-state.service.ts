import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ServicePublishWrapperComponent } from '../components/service-publish-wrapper/service-publish-wrapper.component';
import { ServicePublishDataHolderService } from '../services/service-publish-data-holder.service';

@Injectable()
export class ServicePublishResetStateService implements CanDeactivate<ServicePublishWrapperComponent> {
  constructor(private readonly servicePublishDataHolderService: ServicePublishDataHolderService) {}

  public canDeactivate(): boolean {
    this.servicePublishDataHolderService.reset();
    return true;
  }
}
