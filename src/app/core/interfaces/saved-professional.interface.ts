import {Master} from '@app/core/models/master';

export interface SavedProfessionalInterface<T extends number | Master> {
    id?: number;
    note: string;
    professional: T;
    created: string;
    modified: string;
    created_by: number;
    modified_by: number;
}

export interface BookMarkInterface extends SavedProfessionalInterface<Master> {
}
