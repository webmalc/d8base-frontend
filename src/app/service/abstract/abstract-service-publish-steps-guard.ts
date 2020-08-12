import {CanActivate, Router, UrlTree} from '@angular/router';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';

export abstract class AbstractServicePublishStepsGuard implements CanActivate {

    protected constructor(protected servicePublishService: ServicePublishDataHolderService, protected readonly router: Router) {
    }

    public canActivate(): boolean | UrlTree {
        if (this.servicePublishService.isset(this.getStep() - 1)) {
            return true;
        }

        return this.router.parseUrl(this.getPreviousPageUrl());
    }

    protected abstract getStep(): number;
    protected abstract getPreviousPageUrl(): string;
}
