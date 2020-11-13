import {Injectable} from '@angular/core';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {concat, Observable, Subject} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map, shareReplay} from 'rxjs/operators';

const DARK_MODE_STORAGE_KEY = 'is_dark_mode';

@Injectable({
    providedIn: 'root'
})
export class DarkModeService {
    public darkTheme$: Observable<boolean>;

    private readonly darkThemeSubject = new Subject<boolean>();

    constructor(private readonly storage: StorageManagerService) {
        this.darkTheme$ =
            concat(
                this.isDarkMode(),
                this.darkThemeSubject
            ).pipe(shareReplay(1));
    }

    public setMode(isDark: boolean): void {
        this.storage.set(DARK_MODE_STORAGE_KEY, isDark).then(() => this.darkThemeSubject.next(isDark));
    }

    private isDarkMode(): Observable<boolean> {
        return fromPromise(this.storage.get(DARK_MODE_STORAGE_KEY)).pipe(map(Boolean));
    }
}
