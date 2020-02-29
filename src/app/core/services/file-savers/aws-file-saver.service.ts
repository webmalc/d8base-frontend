import {Injectable} from '@angular/core';
import {FileSaverInterface} from '@app/core/interfaces/file-saver.interface';
import {Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AwsFileSaverService implements FileSaverInterface {

    public saveFile(blob: string): Observable<string> {
        return of<string>(blob);
    }

}
