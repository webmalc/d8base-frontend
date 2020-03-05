import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
    public getFile(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve('fakeData');
        });
    }
}
