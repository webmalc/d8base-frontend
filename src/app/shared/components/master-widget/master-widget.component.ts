import {Component, Input} from '@angular/core';
import {ProfessionalList} from '@app/api/models';
import {HelperService} from '@app/core/services/helper.service';

@Component({
    selector: 'app-master-widget',
    templateUrl: './master-widget.component.html',
    styleUrls: ['./master-widget.component.scss'],
})
export class MasterWidgetComponent {
    @Input() public master: ProfessionalList;

    public defaultAvatar = HelperService.getNoAvatarLink();
}
