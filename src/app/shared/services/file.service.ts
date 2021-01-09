import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
    public getFile(): Promise<File> {
        return new Promise<File>(resolve => {
            resolve(new File(['foo'], 'foo.txt'));
        });
    }
}
