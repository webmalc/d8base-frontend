import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MediaIconFactoryService {
  public static getIcon(media: string): string {
    switch (media) {
      case 'facebook':
        return 'logo-facebook';
      case 'instagram':
        return 'logo-instagram';
      case 'web':
        return 'globe-outline';
      case 'skype':
        return 'logo-skype';
      case 'phone':
        return 'call-outline';
      case 'whatsapp':
        return 'logo-whatsapp';
      case 'E-mail':
        return 'mail-outline';
      default:
        return 'reader-outline';
    }
  }
}
