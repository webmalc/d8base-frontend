import {Injectable} from '@angular/core';
import {DefaultLocation} from '@app/core/models/default-location';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {deserialize, serialize} from 'class-transformer';

@Injectable({
    providedIn: 'root'
})
export class DefaultLocationStorageService {

    private readonly STORAGE_KEY = 'default-location';

    constructor(private readonly storage: StorageManagerService) {
    }

    public async setDefaultLocation(data: DefaultLocation): Promise<void> {
        return this.storage.set(this.STORAGE_KEY, serialize(data));
    }

    public async getDefaultLocation(): Promise<DefaultLocation | null> {
        return deserialize(DefaultLocation, await this.storage.get(this.STORAGE_KEY));
    }
}
