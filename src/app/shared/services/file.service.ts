import { Injectable } from '@angular/core';
import {Filesystem, ReaddirResult} from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
    public getFile(): Promise<ReaddirResult> {
        return Filesystem.readdir({
            path: '/'
        });
    }
}
