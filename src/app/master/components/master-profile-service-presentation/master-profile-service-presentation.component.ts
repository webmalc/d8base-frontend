import {Component, Input} from '@angular/core';
import {Service} from '@app/service/models/service';
import {ServiceTag} from '@app/service/models/service-tag';

@Component({
    selector: 'app-master-profile-service-presentation',
    templateUrl: './master-profile-service-presentation.component.html',
    styleUrls: ['./master-profile-service-presentation.component.scss'],
})
export class MasterProfileServicePresentationComponent {

    @Input() public serviceData: { service: Service, tags?: ServiceTag[] };

    public getHourPrice(): string {
        return this.serviceData.service.price.is_price_fixed ?
            Math.round(this.serviceData.service.price.price).toString() :
            `${Math.round(this.serviceData.service.price.start_price)} - ${this.serviceData.service.price.end_price}`;
    }
}
