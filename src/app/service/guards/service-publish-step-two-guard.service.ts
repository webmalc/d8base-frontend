import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AbstractServicePublishStepsGuard} from '@app/service/abstract/abstract-service-publish-steps-guard';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';

@Injectable()
export class ServicePublishStepTwoGuardService extends AbstractServicePublishStepsGuard implements CanActivate {

    constructor(protected readonly router: Router, protected readonly servicePublishService: ServicePublishDataHolderService) {
        super(servicePublishService, router);
    }

    protected getStep(): number {
        return 1;
    }

    protected getPreviousPageUrl(): string {
        return '/service/publish/step-one';
    }
}
