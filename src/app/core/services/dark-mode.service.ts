import {Injectable} from '@angular/core';
import {StorageManagerService} from './storage-manager.service';

@Injectable({
    providedIn: 'root'
})
export class DarkModeService {
    private readonly DARK_MODE_STORAGE_KEY = 'is_dark_mode';

    constructor(private storage: StorageManagerService) {
    }

    public async isDarkMode(): Promise<boolean> {
        const isDarkMode = await this.storage.get(this.DARK_MODE_STORAGE_KEY);

        return isDarkMode === true;
    }

    public setMode(isDark: boolean): void {
        this.storage.set(this.DARK_MODE_STORAGE_KEY, isDark);
    }
}
