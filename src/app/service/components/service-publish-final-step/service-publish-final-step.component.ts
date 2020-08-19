import {Component, OnInit} from '@angular/core';
import {Master} from '@app/core/models/master';
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
        public serviceStepsNavigationService: ServiceStepsNavigationService
    ) {
        super();
    }

    public publish(): void {
        if (!this.servicePublishDataHolder.getStepData<StepFourDataInterface>(ServicePublishStepFourComponent.STEP).isNewMaster) {
            this.popover().then(() => this.servicePublish.publish());
        } else {
            this.servicePublish.publish();
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
                                this.servicePublishDataHolder.setStepData<FinalStepDataInterface>(
                                    ServicePublishFinalStepComponent.STEP, {master}
                                );
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
}
