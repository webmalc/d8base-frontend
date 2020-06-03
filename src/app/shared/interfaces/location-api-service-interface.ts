import {Observable} from 'rxjs';

export interface LocationApiServiceInterface {
    getTimeZoneList(): Observable<Array<{ value: string, display_name: string }>>;
}
