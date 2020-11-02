import {Component} from '@angular/core';
import {GridSizesInterface} from '@app/core/interfaces/grid-sizes-interface';
import {UserContact} from '@app/profile/models/user-contact';
import {UserContactApiService} from '@app/profile/services/user-contact-api.service';
import {ClientContactInterface} from '@app/shared/interfaces/client-contact-interface';

@Component({
    selector: 'app-contact-tab',
    templateUrl: './contact-tab.component.html',
    styleUrls: ['./contact-tab.component.scss']
})
export class ContactTabComponent {

    public sizes: GridSizesInterface = {
        sizeXs: 12,
        sizeSm: 12,
        sizeMd: 10,
        sizeLg: 10,
        sizeXl: 8
    };

    constructor(
        public userContactApiService: UserContactApiService
    ) {
    }

    public getNewUser(): ClientContactInterface {
        return new UserContact();
    }
}
