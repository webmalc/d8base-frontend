import {Injectable} from '@angular/core';
import {ExtendedLocation} from '@app/core/models/extended-location';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {deserialize, serialize} from 'class-transformer';

@Injectable({
    providedIn: 'root',
})
export class DefaultLocationStorageService {

    private readonly STORAGE_KEY = 'default-location';

    constructor(private readonly storage: StorageManagerService) {
    }

    public async setDefaultLocation(data: ExtendedLocation): Promise<void> {
        return this.storage.set(this.STORAGE_KEY, serialize(data));
    }

    public async getDefaultLocation(): Promise<ExtendedLocation | null> {
        return deserialize(ExtendedLocation, await this.storage.get(this.STORAGE_KEY));
    }
}
