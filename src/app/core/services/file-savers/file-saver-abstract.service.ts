import {FileSaverInterface} from '@app/core/interfaces/file-saver.interface';
import {CameraPhoto} from '@capacitor/core';
import {from, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

export abstract class FileSaverService implements FileSaverInterface {
    public saveCameraPhoto(photo: CameraPhoto): Observable<string> {
        return from(fetch(photo.webPath)).pipe(
            switchMap((response: Body) => {
                return from(response.blob()).pipe(
                    switchMap((blob: Blob) => {
                        const file: File = new File([blob], 'avatar.jpg');

                        return this.saveFile(file);
                    })
                );
            })
        );
    }

    public saveFileSystemFile(file: any): Observable<string> {
        return of('1');
        // return this.saveFile('bbb');
    }


    public abstract saveFile(file: File): Observable<string>;
}
