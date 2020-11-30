import {Component, Input} from '@angular/core';
import {MasterList} from '@app/master/models/master-list';
import {Service} from '@app/service/models/service';

@Component({
    selector: 'app-service-widget',
    templateUrl: './service-widget.component.html',
    styleUrls: ['./service-widget.component.scss']
})
export class ServiceWidgetComponent {
    @Input() public service: Service;

    @Input() public master: MasterList;

    @Input() public alwaysExpanded = false;
}
