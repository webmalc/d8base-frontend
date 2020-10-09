import {Injectable} from '@angular/core';
import {Service} from '@app/service/models/service';
import {ServiceTag} from '@app/service/models/service-tag';

@Injectable()
export class MasterProfileServicesSearchService {

    public search(data: { service: Service, tags: ServiceTag[] }[], needle: string): { service: Service, tags: ServiceTag[] }[] {
        const res: { service: Service, tags: ServiceTag[] }[] = [];

        data.forEach(r => (r.service.name.toLowerCase().includes(needle.toLowerCase())
            || r.service.description.toLowerCase().includes(needle.toLowerCase())) ? res.push(r) : null);

        return res;
    }
}
