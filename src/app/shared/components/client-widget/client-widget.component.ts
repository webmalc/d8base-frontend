import {Component, Input} from '@angular/core';
import {User} from '@app/core/models/user';

@Component({
    selector: 'app-client-widget',
    templateUrl: './client-widget.component.html',
    styleUrls: ['./client-widget.component.scss']
})
export class ClientWidgetComponent {

    @Input() public client: User;

}
