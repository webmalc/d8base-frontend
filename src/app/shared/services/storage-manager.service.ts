import {Storage} from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageManagerService {

    constructor(protected storage: Storage) {}

    public get(storageKey: string): Promise<any> {
        return this.storage.get(storageKey);
    }

    public set(storageKey: string, data: any): Promise<any> {
        return this.storage.set(storageKey, data);
    }

    public remove(storageKey: string): Promise<any> {
        return this.storage.remove(storageKey);
    }
}
