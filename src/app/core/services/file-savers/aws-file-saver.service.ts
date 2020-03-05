import {FileSaverInterface} from '@app/core/interfaces/file-saver.interface';
import {FileSaverService} from '@app/core/services/file-savers/file-saver-abstract.service';
import * as S3 from 'aws-sdk/clients/s3';
import * as AWS from 'aws-sdk/global';
import {bindCallback, Observable, of} from 'rxjs';
import {environment, serviceSettings} from '../../../../environments/environment';
import {PutObjectRequest} from 'aws-sdk/clients/s3';
import {ManagedUpload} from 'aws-sdk/lib/s3/managed_upload';
import SendData = ManagedUpload.SendData;

export class AwsFileSaverService extends FileSaverService implements FileSaverInterface {

    private bucket;

    constructor() {
        super();
        this.bucket = new S3(
            {
                accessKeyId: serviceSettings.aswCredentials.accessKeyId,
                secretAccessKey: serviceSettings.aswCredentials.secretAccessKey,
                region: serviceSettings.aswCredentials.region
            }
        );
    }

    public saveFile(file: File): Observable<string> {
        const params: PutObjectRequest = {
            Bucket: serviceSettings.aswCredentials.bucket,
            Key: file.name,
            Body: file,
            ACL: 'public-read',
            ContentType: file.type
        };

        return new Observable<string>(
            observer => {
                this.bucket.upload(params, null, (err: Error, data: SendData) => {
                    if (data) {
                        observer.next(data.Location);
                    }
                    if (err) {
                        observer.error(err);
                    }
                });
            }
        );
    }

}
