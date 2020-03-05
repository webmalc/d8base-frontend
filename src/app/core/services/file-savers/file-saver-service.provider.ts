import {AwsFileSaverService} from '@app/core/services/file-savers/aws-file-saver.service';
import {FileSaverService} from '@app/core/services/file-savers/file-saver-abstract.service';
import {serviceSettings} from '../../../../environments/environment';

const fileSaverFactory = (): FileSaverService => {
    const saverType = serviceSettings.fileSaverService;
    if (saverType === 'aws') {
        return new AwsFileSaverService();
    }
};

export let fileSaverProvider = {
    provide: FileSaverService,
    useFactory: fileSaverFactory,
    deps: []
};
