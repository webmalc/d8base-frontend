import {Component, OnInit} from '@angular/core';
import {ServicePublishService} from '@app/service/services/service-publish.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {ContactsAddComponent} from '@app/shared/components/contacts-add/contacts-add.component';

@Component({
    selector: 'app-service-publish-final-step',
    templateUrl: './service-publish-final-step.component.html',
    styleUrls: ['./service-publish-final-step.component.scss'],
})
export class ServicePublishFinalStepComponent extends Reinitable implements OnInit {

    constructor(private servicePublish: ServicePublishService) {
        super();
    }

    public publish(): void {
        this.servicePublish.publish();
    }

    public ngOnInit(): void {
        ContactsAddComponent.reinit$.next(true);
    }
}
