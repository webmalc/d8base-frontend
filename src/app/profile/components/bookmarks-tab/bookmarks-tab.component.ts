import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookmarksService} from '@app/profile/services/bookmarks.service';
import {Subscription} from 'rxjs';
import {SavedProfessionalInterface} from '@app/core/interfaces/saved-professional.interface';
import {Master} from '@app/core/models/master';

@Component({
    selector: 'app-bookmarks-tab',
    templateUrl: './bookmarks-tab.component.html',
    styleUrls: ['./bookmarks-tab.component.scss'],
})
export class BookmarksTabComponent implements OnInit, OnDestroy {
    public bookmarks: SavedProfessionalInterface<Master>[] = [];
    public deletedBookmarks: number[] = [];
    private uSub: Subscription;

    constructor(private bookmarksService: BookmarksService) {
    }

    public ngOnInit(): void {
        this.uSub = this.bookmarksService.getAll$().subscribe(
            bookmarks => this.bookmarks = bookmarks
        );
    }

    public ngOnDestroy(): void {
        this.uSub.unsubscribe();
    }

    public removeFromList(deletedBookmarkId: number): void {
        this.deletedBookmarks.push(deletedBookmarkId);
    }

    public restoreToList(restoredBookmarkId: number): void {
        this.deletedBookmarks = this.deletedBookmarks.filter(bookmarkId => bookmarkId !== restoredBookmarkId);
    }
}
