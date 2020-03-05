import {AwsFileSaverService} from './aws-file-saver.service';
import {FileSaverService} from './file-saver-abstract.service';

import {serviceSettings} from '../../../../environments/environment';
import {image} from './test-image';

describe('FileSaverService', () => {
    let service: AwsFileSaverService;

    beforeEach(() => {
        service = new AwsFileSaverService();
    });

    it('should save file  to aws bucket with save method', async (done) => {
        const response = await fetch(image);
        const blob = await response.blob();
        const file = new File([blob], 'test.jpg', {type: 'image/jpeg'});
        service.saveFile(file).subscribe((uri) => {
            expect(uri).toContain(serviceSettings.aswCredentials.bucket);
            done();
        });
    });

    // TODO: error test
    xit('should handle the error when it occurs', () => {
        expect(false).toBeTruthy();
    });
});
