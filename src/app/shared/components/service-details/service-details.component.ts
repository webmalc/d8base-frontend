import {Component, Input} from '@angular/core';
import {MasterInterface} from '@app/core/interfaces/master.interface';
import {Service} from '@app/service/models/service';

@Component({
    selector: 'app-service-details',
    templateUrl: './service-details.component.html',
    styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent {
    @Input() public service: Service;

    @Input() public master: MasterInterface;
}
