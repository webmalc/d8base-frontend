import {fakeAsync, flush, inject, TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {asyncData} from '../../../testing/async-observable-helper';
import {Autofixture} from '../../../testing/fixtures/generator';
import {MasterFixture} from '../../../testing/fixtures/master-fixture';
import {SavedProfessionalFixture} from '../../../testing/fixtures/saved-professional-fixture';
import {MasterInterface} from '../../core/interfaces/master.interface';
import {SavedProfessionalInterface} from '../../core/interfaces/saved-professional.interface';
import {BookmarkMaster} from '../../core/models/bookmark-master';
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
            providers: [BookmarksService, SavedProfessionalApiService, MasterManagerService]
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
        const savedProfs = autoFixture
            .createMany<SavedProfessionalInterface<number>>(SavedProfessionalFixture.create(), 3);
        const masters = autoFixture
            .createMany<MasterInterface>(MasterFixture.create(), 3);

        const ids = [10, 20, 30];
        ids.map((value, index) => {
            savedProfs[index].id = index;
            savedProfs[index].professional = value;
            masters[index].id = value;
        });

        spyOn(savedService, 'getAll$').and.returnValue(asyncData<SavedProfessionalInterface<number>[]>(savedProfs));
        spyOn(masterService, 'getUserLessList$').and.returnValue(asyncData<MasterInterface[]>(masters));
        service.getAll$().subscribe(
            (data: BookmarkMaster[]) => {
                expect(data.length).toBe(3);
                data.map((bookmark: BookmarkMaster) => {
                    const savedProf: SavedProfessionalInterface<number> = savedProfs
                        .find(saved => saved.id === bookmark.id);
                    expect(savedProf.professional).toBe(bookmark.professional.id);
                });
            }
        );
        flush();
    }));

    it('should return bookmark event a master is removed', fakeAsync(() => {
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
});
