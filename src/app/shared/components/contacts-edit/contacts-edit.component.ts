import { Component, Input } from '@angular/core';
import { ContactUnion } from '@app/core/models/contact-union';
import { MediaIconFactoryService } from '@app/core/services/media-icon-factory.service';

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.scss'],
})
export class ContactsEditComponent {
  @Input() public addNewContactUrl: string = '/profile/contact-add/';
  @Input() public editDefaultContactUrl: string = '/profile/contact-add-default/';
  @Input() public editContactUrl: string = '/profile/contact-edit/';
  @Input() public interactable: boolean = false;
  @Input() public contacts: ContactUnion[];

  public getContactIcon(contactDisplay: string): string {
    return MediaIconFactoryService.getIcon(contactDisplay);
  }
}
