import {FileSaverInterface} from '@app/core/interfaces/file-saver.interface';
import {FileSaverService} from '@app/core/services/file-savers/file-saver-abstract.service';
import {Observable, of} from 'rxjs';

export class AwsFileSaverService extends FileSaverService implements FileSaverInterface {

    public saveFile(file: File): Observable<string> {
        return of<string>();
    }

}
