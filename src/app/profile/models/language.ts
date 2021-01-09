import { Expose } from 'class-transformer';

export class Language {
    @Expose() public code: string;
    @Expose() public name: string;
}
