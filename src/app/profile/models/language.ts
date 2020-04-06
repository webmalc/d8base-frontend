import {Expose} from 'class-transformer';

export class Language {
    @Expose() public id: number;
    @Expose() public code: string;
    @Expose() public name: string;
}
