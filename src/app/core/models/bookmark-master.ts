import {SavedProfessionalInterface} from '@app/core/interfaces/saved-professional.interface';
import {Master} from '@app/core/models/master';
import {Expose} from 'class-transformer';
import {MasterInterface} from '@app/core/interfaces/master.interface';

export class BookmarkMaster implements SavedProfessionalInterface<MasterInterface> {
    // tslint:disable:variable-name
    @Expose() public created: string;
    @Expose() public created_by: number;
    @Expose() public id: number;
    @Expose() public modified: string;
    @Expose() public modified_by: number;
    @Expose() public note: string;
    @Expose() public professional: Master | null;
}
