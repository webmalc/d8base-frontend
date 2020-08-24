import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';
import {ChainManagerService} from '@app/service/services/steps-navigation-chain/chain-manager.service';

@Injectable()
export class ServiceStepsNavigationService {

    constructor(private router: Router, private chainManager: ChainManagerService, private j: ServicePublishDataHolderService) { }

    public next(): void {
        this.chainManager.getNextPage(this.router.url).subscribe(
            url => this.router.navigateByUrl(url)
        );
    }

    public previous(): void {
        this.chainManager.getPreviousPage(this.router.url).subscribe(
            url => this.router.navigateByUrl(url)
        );
    }
}
