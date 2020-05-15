import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SavedProfessionalInterface} from '@app/core/interfaces/saved-professional.interface';
import {Master} from '@app/core/models/master';

@Component({
    selector: 'app-bookmarks-item',
    templateUrl: './bookmarks-item.component.html',
    styleUrls: ['./bookmarks-item.component.scss'],
})
export class BookmarksItemComponent {
    @Input() public bookmark: SavedProfessionalInterface<Master>;
    @Input() public deleted: boolean;
    @Output() public removeFromBookmark: EventEmitter<number> = new EventEmitter<number>();
    @Output() public restoreToBookmark: EventEmitter<number> = new EventEmitter<number>();


    public get professional(): Master {
        return this.bookmark.professional;
    }

    public removeFromBookmarks(): void {
        this.removeFromBookmark.emit(this.bookmark.id);
    }

    public restoreToBookmarks(): void {
        this.restoreToBookmark.emit(this.bookmark.id);
    }
}
