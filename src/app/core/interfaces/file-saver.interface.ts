import {Observable} from 'rxjs';

export interface FileSaverInterface {
    saveFile(blob: string): Observable<string>;
}
