import {Injectable} from '@angular/core';
import {AbstractReadonlyApiService} from '@app/core/abstract/abstract-readonly-api.service';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Tag} from '@app/master/models/tag';
import {environment} from '@env/environment';
import {plainToClass} from 'class-transformer';

@Injectable()
export class TagsListApiService extends AbstractReadonlyApiService<Tag> {

    private readonly url = environment.backend.professional_tags_list;

    constructor(protected readonly client: ApiClientService) {
        super(client);
    }

    protected getUrl(): string {
        return this.url;
    }

    // @ts-ignore
    protected transform(data: Tag | Tag[]): Tag | Tag[] {
        return plainToClass(Tag, data);
    }
}
