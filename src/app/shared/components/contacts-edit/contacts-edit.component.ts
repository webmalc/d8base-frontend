import { Component, Input } from '@angular/core';
import { getContactIconName } from '@app/core/functions/media.functions';
import { ContactUnion } from '@app/core/models/contact-union';

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
    return getContactIconName(contactDisplay);
  }

  public getUrl(contact: ContactUnion): string {
    return contact.id ? this.editContactUrl + contact.id : this.editDefaultContactUrl + contact.contact;
  }
}
