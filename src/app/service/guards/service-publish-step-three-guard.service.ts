import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractServicePublishStepsGuard} from '@app/service/abstract/abstract-service-publish-steps-guard';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';

@Injectable()
export class ServicePublishStepThreeGuardService extends AbstractServicePublishStepsGuard {

    constructor(protected readonly router: Router, protected readonly servicePublishService: ServicePublishDataHolderService) {
        super(servicePublishService, router);
    }

    protected getPreviousPageUrl(): string {
        return '/service/publish/step-two';
    }

    protected getStep(): number {
        return 2;
    }
}
