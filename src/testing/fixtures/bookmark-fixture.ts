import { BookmarkMaster } from '@app/core/models/bookmark-master';
import { Master } from '@app/core/models/master';

export class BookmarkFixture {
  public static create(master: Master): BookmarkMaster {
    return {
      id: 1,
      created: '',
      created_by: 0,
      modified: '',
      modified_by: 0,
      note: 'test note',
      professional: master,
    };
  }
}
