import { Injectable } from '@angular/core';
import {Filesystem, ReaddirResult} from '@capacitor/core';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
    public getFile(): Promise<File> {
        return new Promise<File>(resolve => {
            resolve(new File(['foo'], 'foo.txt'));
        });
    }
}
