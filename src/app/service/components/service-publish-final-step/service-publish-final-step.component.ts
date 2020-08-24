import {Component, OnInit} from '@angular/core';
import {Master} from '@app/core/models/master';
import {MasterLocation} from '@app/master/models/master-location';
import {MasterLocationApiService} from '@app/master/services/master-location-api.service';
import {MasterPickerPopoverComponent} from '@app/service/components/master-peeker/master-picker-popover.component';
import {ServicePublishStepFourComponent} from '@app/service/components/service-publish-step-four/service-publish-step-four.component';
import {FinalStepDataInterface} from '@app/service/interfaces/final-step-data-interface';
import {StepFourDataInterface} from '@app/service/interfaces/step-four-data-interface';
import {ServicePublishDataHolderService} from '@app/service/services/service-publish-data-holder.service';
import {ServicePublishService} from '@app/service/services/service-publish.service';
import {ServiceStepsNavigationService} from '@app/service/services/service-steps-navigation.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {ContactsAddComponent} from '@app/shared/components/contacts-add/contacts-add.component';
import {PopoverController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-service-publish-final-step',
    templateUrl: './service-publish-final-step.component.html',
    styleUrls: ['./service-publish-final-step.component.scss'],
})
export class ServicePublishFinalStepComponent extends Reinitable implements OnInit {

    public static STEP = 7;

    constructor(
        private servicePublish: ServicePublishService,
        private popoverController: PopoverController,
        private servicePublishDataHolder: ServicePublishDataHolderService,
        public serviceStepsNavigationService: ServiceStepsNavigationService,
        private masterLocationApi: MasterLocationApiService
    ) {
        super();
    }

    public publish(): void {
        if (!this.servicePublishDataHolder.getStepData<StepFourDataInterface>(ServicePublishStepFourComponent.STEP).isNewMaster) {
            this.popover().then(() => this.servicePublish.publish().subscribe(
                () => console.log('done')
            ));
        } else {
            this.servicePublish.publish().subscribe(
                () => console.log('done')
            );
        }
    }

    public ngOnInit(): void {
        ContactsAddComponent.reinit$.next(true);
    }

    private popover(): Promise<void> {
        return new Promise<void>(resolve => {
            this.popoverController.create({
                component: MasterPickerPopoverComponent,
                translucent: true
            }).then(pop => pop.present().then(
                () => {
                    const subscription = MasterPickerPopoverComponent.master$.subscribe(
                        (master: Master) => {
                            if (master !== undefined) {
                                this.getMasterLocation(master).subscribe(
                                    masterLocation => this.servicePublishDataHolder.setStepData<FinalStepDataInterface>(
                                        ServicePublishFinalStepComponent.STEP, {master, masterLocation}
                                    )
                                );
                                this.servicePublishDataHolder.assignStepData(ServicePublishStepFourComponent.STEP, {isNewMaster: false});
                                this.popoverController.dismiss();
                                subscription.unsubscribe();
                                resolve();
                            }
                        }
                    );
                }
            ));
        });
    }

    private getMasterLocation(master: Master): Observable<MasterLocation> {
        return this.masterLocationApi.getByClientId(master.id).pipe(
            map(list => list.results.length === 0 ? null : list.results[0])
        );
    }
}
