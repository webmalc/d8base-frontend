import {Injectable} from '@angular/core';
import {AbstractApiService} from '@app/core/abstract/abstract-api.service';
import {ApiClientService} from '@app/core/services/api-client.service';
import {MasterPhoto} from '@app/master/models/master-photo';
import {plainToClass} from 'class-transformer';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MasterPhotosApiService extends AbstractApiService<MasterPhoto> {

    private readonly url = environment.backend.master_photos;

    constructor(protected client: ApiClientService) {
        super(client);
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: MasterPhoto | MasterPhoto[]): MasterPhoto | MasterPhoto[] {
        return plainToClass(MasterPhoto, data);
    }
}
