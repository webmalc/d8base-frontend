import {Injectable} from '@angular/core';
import {Camera, CameraPhoto, CameraResultType, CameraSource} from '@capacitor/core';


@Injectable({
    providedIn: 'root'
})
export class PhotoService {
    public createPhoto(quality: number = 100): Promise<CameraPhoto> {
         return Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Prompt,
            quality
        });
    }

}
