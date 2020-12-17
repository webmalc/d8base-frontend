import {Component} from '@angular/core';
import {Router} from '@angular/router';
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
import {Observable} from 'rxjs';
import {map, single} from 'rxjs/operators';

@Component({
    selector: 'app-service-publish-final-step',
    templateUrl: './service-publish-final-step.component.html',
    styleUrls: ['./service-publish-final-step.component.scss']
})
export class ServicePublishFinalStepComponent {

    public readonly contactAddUrl: string = '/professional/professional-contact-add/';
    public readonly contactEditUrl: string = '/professional/professional-contact-edit/';
    public readonly contactAddDefaultUrl: string = '/professional/professional-contact-add-default/';

    constructor(
        private readonly servicePublish: ServicePublishService,
        private readonly servicePublishDataHolder: ServicePublishDataHolderService,
        public readonly serviceStepsNavigationService: ServiceStepsNavigationService,
        private readonly masterLocationApi: MasterLocationApiService,
        private readonly router: Router,
        private readonly masterManager: MasterManagerService
    ) {
    }

    public async publish(): Promise<void> {
        const master = this.isNewMaster() ? null : await this.getMaster().toPromise();
        if (master) {
            const masterLocation = await this.getMasterLocation(master);
            await this.servicePublishDataHolder.setStepData<FinalStepDataInterface>(
                ServicePublishSteps.Final, {master, masterLocation}
            );
        }
        this.servicePublish.publish()
            .pipe(single())
            .subscribe((service) => this.router.navigate(['service', service.id]));
    }

    public isNewMaster(): boolean {
        return this.servicePublishDataHolder.getStepData<StepFourDataInterface>(ServicePublishSteps.Four)?.isNewMaster || false;
    }

    private getMaster(): Observable<Master> {
        return this.masterManager.getMasterList().pipe(
            map(list => list[0])
        );
    }

    private getMasterLocation(master: Master): Promise<MasterLocation | null> {
        return this.masterLocationApi.getByClientId(master.id).pipe(
            map(list => list.results.length === 0 ? null : list.results[0])
        ).toPromise();
    }
}
