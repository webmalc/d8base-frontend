import { Component, Input } from '@angular/core';
import { ProfessionalContactInline } from '@app/api/models/professional-contact-inline';
import { getContactIconName } from '@app/core/functions/media.functions';

@Component({
  selector: 'app-contacts-view',
  templateUrl: './contacts-view.component.html',
  styleUrls: ['./contacts-view.component.scss'],
})
export class ContactsViewComponent {
  @Input() public contacts: ProfessionalContactInline[];

  public getContactIcon(contactDisplay: string): string {
    return getContactIconName(contactDisplay);
  }
}
