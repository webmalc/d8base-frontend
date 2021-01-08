import {Component, Input} from '@angular/core';
import {ProfessionalList} from '@app/api/models';
import {Service} from '@app/service/models/service';

@Component({
    selector: 'app-service-widget',
    templateUrl: './service-widget.component.html',
    styleUrls: ['./service-widget.component.scss']
})
export class ServiceWidgetComponent {
    @Input() public service: Service;

    @Input() public master: ProfessionalList;

    @Input() public alwaysExpanded = false;

    public hasPaymentMethod(method: 'cash' | 'online'): boolean {
        return this.service.price?.payment_methods.includes(method);
    }
}
