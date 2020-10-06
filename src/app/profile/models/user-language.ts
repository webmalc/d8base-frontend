import {Expose} from 'class-transformer';

// tslint:disable:variable-name
export class UserLanguage {
    @Expose() public id: number;
    @Expose() public language: string;
    @Expose() public is_native: boolean;
}
