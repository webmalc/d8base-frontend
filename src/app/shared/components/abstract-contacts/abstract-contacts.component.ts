import {Component, Input} from '@angular/core';
import {ProfessionalContactInline} from '@app/api/models/professional-contact-inline';
import {MediaIconFactoryService} from '@app/core/services/media-icon-factory.service';

@Component({
    selector: 'app-abstract-contacts',
    templateUrl: './abstract-contacts.component.html',
    styleUrls: ['./abstract-contacts.component.scss']
})
export class AbstractContactsComponent {

    @Input() public addNewContactUrl: string = '/profile/contact-add/';
    @Input() public editDefaultContactUrl: string = '/profile/contact-add-default/';
    @Input() public editContactUrl: string = '/profile/contact-edit/';
    @Input() public interactable: boolean = false;
    @Input() public clientContacts: ProfessionalContactInline[];

    public getContactIcon(contactDisplay: string): string {
        return MediaIconFactoryService.getIcon(contactDisplay);
    }
}
