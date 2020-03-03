import {CameraPhoto} from '@capacitor/core';
import {Observable} from 'rxjs';

export interface FileSaverInterface {
    // saveFile(blob: string): Observable<string>;
    saveCameraPhoto(photo: CameraPhoto): Observable<string>;
}
