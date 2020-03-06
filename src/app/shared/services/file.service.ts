import { Injectable } from '@angular/core';
import {Filesystem, ReaddirResult} from '@capacitor/core';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
    public getFile(): Promise<string> {
        return new Promise<string>(resolve => {
            resolve('1');
        });
    }
}
