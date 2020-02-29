import {FileSaverInterface} from '@app/core/interfaces/file-saver.interface';
import {Observable} from 'rxjs';

export abstract class FileSaverService implements FileSaverInterface {
    public abstract saveFile(blob: string): Observable<string>;
}
