import {Certification} from '@app/profile/models/certification';
import {Expose} from 'class-transformer';

export class Education {
    @Expose() public id?: number;
    @Expose() public master_id?: number;
    @Expose() public experience?: string;
    @Expose() public education?: number;
    @Expose() public certification?: Certification[];
}
