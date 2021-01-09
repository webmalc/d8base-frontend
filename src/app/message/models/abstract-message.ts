import { Expose } from 'class-transformer';

// tslint:disable:variable-name
export class AbstractMessage {
    @Expose() public interlocutor: string;
    @Expose() public interlocutor_id: number;
    @Expose() public interlocutor_avatar_thumbnail: string;
    @Expose() public body: string;
    @Expose() public is_read: boolean;
    @Expose() public created: string;
    @Expose() public unread_count: number;
}
