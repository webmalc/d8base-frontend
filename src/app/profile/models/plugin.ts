import {Expose} from 'class-transformer';

export class Plugin {
    // tslint:disable:variable-name
    @Expose() public id: number;
    @Expose() public title?: string;
    @Expose() public description?: string;
    @Expose() public instruction?: string;
    @Expose() public author_id?: number;
    @Expose() public backend_name?: string;
    @Expose() public frontend_name?: string;
}
