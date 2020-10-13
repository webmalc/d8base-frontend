import {AbstractPhotoModel} from '@app/core/models/abstract-photo-model';
import {HelperService} from '@app/core/services/helper.service';
import {Expose} from 'class-transformer';

// tslint:disable:variable-name
export class Certificate extends AbstractPhotoModel {
    @Expose() public id: number;
    @Expose() public professional: number;
    @Expose() public name: string;
    @Expose() public organization: string;
    @Expose() public date: string;
    @Expose() public certificate_id: string;
    @Expose() public url: string;

    public formatDate(): void {
        this.date = HelperService.fromDatetime(this.date).date;
    }
}
