import {HttpClientTestingModule} from '@angular/common/http/testing';
import {fakeAsync, flush, inject, TestBed} from '@angular/core/testing';
import {StorageManagerMock} from 'src/testing/mocks';
import {asyncData} from '../../../testing/async-observable-helper';
import {BookmarkFixture} from '../../../testing/fixtures/bookmark-fixture';
import {Autofixture} from '../../../testing/fixtures/generator';
import {MasterFixture} from '../../../testing/fixtures/master-fixture';
import {SavedProfessionalFixture} from '../../../testing/fixtures/saved-professional-fixture';
import {MasterInterface} from '../../core/interfaces/master.interface';
import {SavedProfessionalInterface} from '../../core/interfaces/saved-professional.interface';
import {BookmarkMaster} from '../../core/models/bookmark-master';
import {StorageManagerService} from '../../core/proxies/storage-manager.service';
import {MasterManagerService} from '../../core/services/master-manager.service';
import {BookmarksService} from './bookmarks.service';
import {SavedProfessionalApiService} from './saved-professional-api.service';

describe('BookmarksService', () => {
    let service: BookmarksService;
    let savedService: SavedProfessionalApiService;
    let masterService: MasterManagerService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                BookmarksService,
                SavedProfessionalApiService,
                MasterManagerService,
                {provide: StorageManagerService, useClass: StorageManagerMock}
            ]
        });
    });
    beforeEach(inject([BookmarksService, SavedProfessionalApiService, MasterManagerService], (bms, sps, mms) => {
        service = bms;
        savedService = sps;
        masterService = mms;
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return bookmarks with method getAll$()', fakeAsync(() => {
        const autoFixture = new Autofixture();
        const bookmarks = autoFixture
            .createMany<SavedProfessionalInterface<number>>(SavedProfessionalFixture.create(), 3);
        const masters = autoFixture
            .createMany<MasterInterface>(MasterFixture.create(), 3);

        const ids = [10, 20, 30];
        ids.map((value, index) => {
            bookmarks[index].id = index;
            bookmarks[index].professional = value;
            masters[index].id = value;
        });
        spyOn(savedService, 'getAll$').and.returnValue(asyncData<SavedProfessionalInterface<number>[]>(bookmarks));
        spyOn(masterService, 'getUserLessList$').and.callFake((data) => {
            expect(bookmarks.map((bookmark) => bookmark.professional)).toEqual(data);

            return asyncData<MasterInterface[]>(masters);
        });
        service.getAll$().subscribe(
            (data: BookmarkMaster[]) => {
                expect(data.length).toBe(3);
                data.map((bookmark: BookmarkMaster) => {
                    const savedProf: SavedProfessionalInterface<number> = bookmarks
                        .find(saved => saved.id === bookmark.id);
                    expect(savedProf.professional).toBe(bookmark.professional.id);
                });
            }
        );
        flush();
    }));

    it('should return bookmark with professional null value even a professional is removed before', fakeAsync(() => {
        spyOn(savedService, 'getAll$')
            .and.returnValue(asyncData<SavedProfessionalInterface<number>[]>(
            [SavedProfessionalFixture.create()]
        ));
        spyOn(masterService, 'getUserLessList$').and.returnValue(asyncData<MasterInterface[]>([]));

        service.getAll$().subscribe(
            (data: BookmarkMaster[]) => {
                expect(data.length).toBe(1);
                expect(data[0].professional).toBeNull();
            }
        );
    }));

    it('should be able to delete bookmark', () => {
        spyOn(savedService, 'removeById');
        service.deleteBookmark(0);
        expect(savedService.removeById).toHaveBeenCalled();
    });

    it('should be able to create saved professional item and return filled bookmark', fakeAsync(() => {
        const saved: SavedProfessionalInterface<number> = SavedProfessionalFixture.create();
        const master: MasterInterface = MasterFixture.create();
        master.id = 333;
        saved.professional = master.id;

        spyOn(savedService, 'create').and.returnValue(asyncData(saved));
        spyOn(masterService, 'getUserLessList$').and.returnValue(asyncData([master]));
        service.createBookmark(saved).subscribe(
            value => {
                expect(value).toBeInstanceOf(BookmarkMaster);
            }
        );
        flush();
        expect(savedService.create).toHaveBeenCalled();
        expect(masterService.getUserLessList$).toHaveBeenCalledWith([333]);
    }));

    it('should be able to throw error when master is null', () => {
        const master = null;
        const bookmark = BookmarkFixture.create(master);
        service.restoreBookmark(bookmark).subscribe(
            value => value,
            err => {
                expect(err).toEqual('Cannot restore bookmark with null master');
            }
        );
    });

    it('should call create Bookmark when calling restoreBookmark', () => {
        const bookmark = BookmarkFixture.create(MasterFixture.create());
        spyOn(service, 'createBookmark');
        service.restoreBookmark(bookmark);
        expect(service.createBookmark).toHaveBeenCalled();
    });
});
