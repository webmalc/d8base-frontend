import {TestBed} from '@angular/core/testing';

import {BookmarksService} from './bookmarks.service';

describe('BookmarksService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [BookmarksService]
    }));

    it('should be created', () => {
        const service: BookmarksService = TestBed.inject(BookmarksService);
        expect(service).toBeTruthy();
    });
});
