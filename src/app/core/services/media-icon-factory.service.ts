import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class MediaIconFactoryService {
  public static getIcon(media: string): string {
    const contacts = {
      facebook: 'logo-facebook',
      instagram: 'logo-instagram',
      skype: 'logo-skype',
      whatsapp: 'logo-whatsapp',
      phone: 'call-outline',
      email: 'mail-outline',
      web: 'globe-outline',
      default: 'reader-outline',
      ...environment.contacts,
    };

    return contacts[media.toLowerCase()] ?? contacts.default;
  }
}
