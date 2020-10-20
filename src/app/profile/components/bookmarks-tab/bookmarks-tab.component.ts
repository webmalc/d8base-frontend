import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookmarkMaster} from '@app/core/models/bookmark-master';
import {BookmarksService} from '@app/profile/services/bookmarks.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-bookmarks-tab',
    templateUrl: './bookmarks-tab.component.html',
    styleUrls: ['./bookmarks-tab.component.scss'],
})
export class BookmarksTabComponent implements OnInit, OnDestroy {
    public bookmarks: BookmarkMaster[] = [];
    public deletedBookmarks: number[] = [];
    private uSub: Subscription;

    constructor(
        private readonly bookmarksService: BookmarksService
    ) {
    }

    public ngOnInit(): void {
        this.uSub = this.bookmarksService.getAll$().subscribe(
            bookmarks => {
                this.bookmarks = bookmarks;
            }
        );
    }

    public ngOnDestroy(): void {
        if (this.uSub) {
            this.uSub.unsubscribe();
        }
    }

    public removeFromList(deletedBookmarkId: number): void {
        this.bookmarksService.deleteBookmark(deletedBookmarkId).subscribe(
            _ => {
                this.deletedBookmarks.push(deletedBookmarkId);
            }
        );
    }

    public restoreToList(restoredBookmarkId: number): void {
        const oldBookmark = this.bookmarks.find(bmark => restoredBookmarkId === bmark.id);
        this.bookmarksService.restoreBookmark(oldBookmark).subscribe(
            newBookmark => {
                this.deletedBookmarks = this.deletedBookmarks.filter(bookmarkId => bookmarkId !== oldBookmark.id);
                this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== oldBookmark.id);
                this.bookmarks.push(newBookmark);
            }
        );
    }
}
