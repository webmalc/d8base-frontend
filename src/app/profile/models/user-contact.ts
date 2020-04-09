import {Expose} from 'class-transformer';

export class UserContact {
    @Expose() public id?: number;
    @Expose() public contact: number;
    @Expose() public contact_display?: string;
    @Expose() public value?: string;
}
