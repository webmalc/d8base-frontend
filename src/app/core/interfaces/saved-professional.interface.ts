import {MasterInterface} from '@app/core/interfaces/master.interface';
import {Master} from '@app/core/models/master';

export interface SavedProfessionalInterface<T extends number | MasterInterface> {
    id?: number;
    note: string;
    professional: T;
    created: string;
    modified: string;
    created_by: number;
    modified_by: number;
}

export interface BookMarkInterface extends SavedProfessionalInterface<MasterInterface> {
}
