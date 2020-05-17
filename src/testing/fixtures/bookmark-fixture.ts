import {BookMarkInterface} from '@app/core/interfaces/saved-professional.interface';
import {Master} from '@app/core/models/master';

export class BookmarkFixture {
    public static create(master: Master): BookMarkInterface {
        return {
            id: 1,
            created: '',
            created_by: 0,
            modified: '',
            modified_by: 0,
            note: 'test note',
            professional: master
        };
    }
}
