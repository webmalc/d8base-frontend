import { Injectable } from '@angular/core';
import { AbstractReadonlyApiService } from '@app/core/abstract/abstract-readonly-api.service';
import { ApiClientService } from '@app/core/services/api-client.service';
import { MasterPhoto } from '@app/master/models/master-photo';
import { environment } from '@env/environment';
import { plainToClass } from 'class-transformer';

@Injectable({
    providedIn: 'root',
})
export class MasterPhotosReadonlyApiService extends AbstractReadonlyApiService<MasterPhoto> {

    private readonly url = environment.backend.master_photos_readonly;

    constructor(protected readonly client: ApiClientService) {
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
