import {InjectionToken, Provider} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiClientService} from '@app/core/services/api-client.service';

export const BOX_TYPE = new InjectionToken<string>('box.type');

const boxTypeFactory = (route: ActivatedRoute): string => {
    return route.snapshot.data.boxType;
};

export const boxTypeProvider: Provider = {
    provide: BOX_TYPE,
    useFactory: boxTypeFactory,
    deps: [ActivatedRoute]
};
