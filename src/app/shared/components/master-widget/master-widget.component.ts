import {Component, Input} from '@angular/core';
import {MasterList} from '@app/master/models/master-list';

@Component({
    selector: 'app-master-widget',
    templateUrl: './master-widget.component.html',
    styleUrls: ['./master-widget.component.scss']
})
export class MasterWidgetComponent {
    @Input() public master: MasterList;
}
