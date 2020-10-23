import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {IonicModule, IonLabel} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {StorageManagerMock} from 'src/testing/mocks';
import {asyncData} from '../../../../testing/async-observable-helper';
import {BookmarkFixture} from '../../../../testing/fixtures/bookmark-fixture';
import {Autofixture} from '../../../../testing/fixtures/generator';
import {MasterFixture} from '../../../../testing/fixtures/master-fixture';
import {BookmarkMaster} from '../../../core/models/bookmark-master';
import {Master} from '../../../core/models/master';
import {StorageManagerService} from '../../../core/proxies/storage-manager.service';
import {BookmarksService} from '../../services/bookmarks.service';
import {SavedProfessionalApiService} from '../../services/saved-professional-api.service';
import {BookmarksItemComponent} from './bookmarks-item/bookmarks-item.component';
import {BookmarksTabComponent} from './bookmarks-tab.component';

describe('BookmarksTabComponent', () => {
    let component: BookmarksTabComponent;
    let fixture: ComponentFixture<BookmarksTabComponent>;
    let bookmarksService: BookmarksService;
    let bookmarks: BookmarkMaster[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BookmarksTabComponent, BookmarksItemComponent],
            imports: [IonicModule, HttpClientTestingModule, TranslateModule.forRoot()],
            providers: [
                BookmarksService,
                SavedProfessionalApiService,
                {provide: StorageManagerService, useClass: StorageManagerMock}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(BookmarksTabComponent);
        component = fixture.componentInstance;
    }));

    beforeEach(inject([BookmarksService], (bms) => {
        bookmarksService = bms;

        const autoFixture = new Autofixture();
        const masters = autoFixture
            .createMany<Master>(MasterFixture.create(), 3);
        const ids = [10, 20, 30];
        ids.map((value, index) => {
            masters[index].id = value;
        });
        bookmarks = masters.map((master, idx) => {
            const bookmark = BookmarkFixture.create(master);
            bookmark.id = idx;

            return bookmark;
        });
        spyOn(bookmarksService, 'getAll$').and.returnValue(asyncData(bookmarks));
        component.bookmarks = bookmarks;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should draw bookmarks items', () => {
        const items = fixture.debugElement.queryAll(By.directive(BookmarksItemComponent));
        expect(items.length).toBe(bookmarks.length);
    });

    it('should show message when list empty', () => {
        component.bookmarks = [];
        fixture.detectChanges();
        const label = fixture.debugElement.query(By.directive(IonLabel));
        expect(label).toBeTruthy();
        expect(label.nativeElement.textContent).toBeTruthy();
    });

    it('should be able to remove bookmark', fakeAsync(() => {
        spyOn(bookmarksService, 'deleteBookmark').and.returnValue(asyncData<void>(null));
        component.removeFromList(bookmarks[0].id);
        tick();
        expect(component.deletedBookmarks.length).toBe(1);
        expect(component.deletedBookmarks[0]).toEqual(bookmarks[0].id);
    }));

    it('should be able to restore bookmark', async(() => {
        const bookmark = component.bookmarks[1];
        component.deletedBookmarks.push(bookmark.id);
        fixture.detectChanges();
        // make sure about init conditions
        expect(component.deletedBookmarks.includes(bookmark.id)).toBeTruthy();
        expect(component.bookmarks.find(bmrk => bmrk.id === bookmark.id)).toBeTruthy();

        const newBookmark = BookmarkFixture.create(bookmark.professional);
        newBookmark.id = 333;
        spyOn(bookmarksService, 'restoreBookmark').and.returnValue(asyncData(newBookmark));
        component.restoreToList(bookmark.id);
        fixture.whenStable().then(() => {
            expect(bookmarksService.restoreBookmark).toHaveBeenCalled();
            expect(component.deletedBookmarks.includes(bookmark.id)).toBeFalsy();
            expect(component.bookmarks.find(bmrk => bmrk.id === bookmark.id)).toBeFalsy();
            expect(component.bookmarks.find(bmrk => bmrk.id === newBookmark.id)).toBeTruthy();
        });

    }));
});
