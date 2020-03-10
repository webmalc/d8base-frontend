import {Expose} from 'class-transformer';

export class Contact {
    @Expose() public id?: number;
    @Expose() public user_id: number;
    @Expose() public whatsapp?: string;
    @Expose() public facebook_messenger?: string;
    @Expose() public instagram?: string;
    @Expose() public www?: string;
}
