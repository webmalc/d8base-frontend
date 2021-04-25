import { Component, Input } from '@angular/core';
import { ProfessionalContactInline } from '@app/api/models/professional-contact-inline';
import { MediaIconFactoryService } from '@app/core/services/media-icon-factory.service';

@Component({
  selector: 'app-contacts-view',
  templateUrl: './contacts-view.component.html',
  styleUrls: ['./contacts-view.component.scss'],
})
export class ContactsViewComponent {
  @Input() public contacts: ProfessionalContactInline[];

  public getContactIcon(contactDisplay: string): string {
    return MediaIconFactoryService.getIcon(contactDisplay);
  }
}
