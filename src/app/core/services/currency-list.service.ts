import {Injectable} from '@angular/core';
import {UserSettingsApiService} from '@app/core/services/user-settings-api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CurrencyListService {

    constructor(private api: UserSettingsApiService) { }

    public getCurrencyList(): Observable<{ value: string, display_name: string }[]> {
        return this.api.getOptions().pipe(map(data => data.actions.POST.currency.choices));
    }
}
