import { Injectable } from '@angular/core';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class MediaIconFactoryService {
  public static getIcon(media: string): string {
    const contacts: object = environment.contacts;

    return contacts[media] ?? contacts['default'];
  }
}
