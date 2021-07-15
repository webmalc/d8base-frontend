import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class MediaIconFactoryService {
  public static getIcon(media: string): string {
    const contacts = environment.contacts;
    const defaultLogo = 'reader-outline'

    return contacts[media] ?? defaultLogo;
  }
}
