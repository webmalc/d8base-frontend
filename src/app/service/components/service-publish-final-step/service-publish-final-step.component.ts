import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {Master} from '@app/core/models/master';
import {MasterManagerService} from '@app/core/services';
import {MasterLocation} from '@app/master/models/master-location';
import {MasterLocationApiService} from '@app/master/services/master-location-api.service';
import {ServicePublishSteps} from '@app/service/enums/service-publish-steps';
import {FinalStepDataInterface} from '@app/service/interfaces/final-step-data-interface';
import {StepFourDataInterface} from '@app/service/interfaces/step-four-data-interface';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';
import {ServicePublishService} from '@app/service/services/service-publish.service';
import {ServiceStepsNavigationService} from '@app/service/services/service-steps-navigation.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {ContactsAddComponent} from '@app/shared/components/contacts-add/contacts-add.component';
import {PopoverController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {map, single} from 'rxjs/operators';

@Component({
    selector: 'app-service-publish-final-step',
    templateUrl: './service-publish-final-step.component.html',
    styleUrls: ['./service-publish-final-step.component.scss']
})
export class ServicePublishFinalStepComponent extends Reinitable {

    constructor(
        private readonly servicePublish: ServicePublishService,
        private readonly popoverController: PopoverController,
        private readonly servicePublishDataHolder: ServicePublishDataHolderService,
        public serviceStepsNavigationService: ServiceStepsNavigationService,
        private readonly masterLocationApi: MasterLocationApiService,
        private readonly router: Router,
        private readonly masterManager: MasterManagerService
    ) {
        super();
    }

    public async publish(): Promise<void> {
        const isNewMaster = this.servicePublishDataHolder.getStepData<StepFourDataInterface>(ServicePublishSteps.Four).isNewMaster;
        const master = isNewMaster ? null : await this.getMaster().toPromise();
        if (master) {
            const masterLocation = await this.getMasterLocation(master);
            await this.servicePublishDataHolder.setStepData<FinalStepDataInterface>(
                ServicePublishSteps.Final, {master, masterLocation}
            );
        }
        this.servicePublish.publish()
            .pipe(single())
            .subscribe((service) => this.router.navigate(['service', service.id ]));
    }

    protected init(): void {
        ContactsAddComponent.reinit$.next(true);
    }

    private getMaster(): Observable<Master> {
        return this.masterManager.getMasterList().pipe(
            map(list => list[0])
        );
    }

    private getMasterLocation(master: Master): Promise<MasterLocation> {
        return this.masterLocationApi.getByClientId(master.id).pipe(
            map(list => list.results.length === 0 ? null : list.results[0])
        ).toPromise();
    }
}
