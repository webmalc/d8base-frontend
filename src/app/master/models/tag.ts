import { Expose } from 'class-transformer';

export class Tag {
    @Expose() public id: number;
    @Expose() public professional: number;
    @Expose() public name: string;
}
