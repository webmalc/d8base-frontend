import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ChainManagerService} from '@app/service/services/steps-navigation-chain/chain-manager.service';

@Injectable()
export class ServiceStepsNavigationService {

    // private readonly urls: string[] = [
    //     '/service/publish/step-one',
    //     '/service/publish/step-two',
    //     '/service/publish/step-three',
    //     '/service/publish/step-four',
    //     '/service/publish/step-five',
    //     '/service/publish/step-six',
    //     '/service/publish/step-seven',
    //     '/service/publish/final',
    // ];

    constructor(private router: Router, private chainManager: ChainManagerService) { }

    public navigateToNextStep(): void {
        console.log(this.chainManager.getNextPage(this.router.url));
        this.router.navigateByUrl(this.chainManager.getNextPage(this.router.url));
    }

    public navigateToPreviousStep(): void {
        this.router.navigateByUrl(this.chainManager.getPreviousPage(this.router.url));
    }
}
