import {Injectable} from '@angular/core';
import {MasterInterface} from '@app/core/interfaces/master.interface';
import {SavedProfessionalInterface} from '@app/core/interfaces/saved-professional.interface';
import {BookmarkMaster} from '@app/core/models/bookmark-master';
import {Master} from '@app/core/models/master';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {SavedProfessionalApiService} from '@app/profile/services/saved-professional-api.service';
import {plainToClass} from 'class-transformer';
import {Observable, throwError} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';


@Injectable()
export class BookmarksService {
    private readonly url = environment.backend.saved_professionals;

    constructor(
        private savedService: SavedProfessionalApiService,
        private masterManager: MasterManagerService
    ) {
    }

    public getAll$(): Observable<BookmarkMaster[]> {
        let rawBookmarks: SavedProfessionalInterface<number>[] = [];

        return this.savedService.getAll$()
            .pipe(
                map(value => {
                    rawBookmarks = value;

                    return value.map(({professional}) => professional);
                }),
                switchMap(ids => this.masterManager.getUserLessList$(ids)),
                map((value: MasterInterface[]) => {
                    return this.fill(rawBookmarks, value);
                })
            );
    }
    public createBookmark(master: MasterInterface): Observable<BookmarkMaster> {
        let rawBookmark: SavedProfessionalInterface<number>;

        return this.savedService.create(master)
            .pipe(
                map((value) => {
                    rawBookmark = value;

                    return master.id;
                }),
                switchMap(id => this.masterManager.getUserLessList$([id])),
                map(masters => this.fill([rawBookmark], masters).pop())
            );
    }

    public restoreBookmark(bookmark: BookmarkMaster): Observable<BookmarkMaster> {
        if (bookmark.professional === null) {
            return throwError('Cannot restore bookmark with null master');
        }

        return this.createBookmark(bookmark.professional);
    }

    public deleteBookmark(id: number): Observable<void> {
        return this.savedService.removeById(id);
    }

    private fill(
        rawBooks: SavedProfessionalInterface<number>[], masters: MasterInterface[]): BookmarkMaster[] {
        return rawBooks.map(prof => {
            const masterId: number = prof.professional;
            const masterRaw: MasterInterface = masters.find((master) => master.id === masterId);
            const bookmark = plainToClass(BookmarkMaster, prof);
            bookmark.professional = masterRaw ? plainToClass(Master, masterRaw) : null;

            return bookmark;
        });
    }

    // private fill<T, U, W>(external: T[], internal: U[], fillField?: string): W[] {
    //     return external.map<W>(prof => {
    //         const masterId: number = prof['professional'];
    //         const masterRaw: U = internal.find((master) => master.id === masterId);
    //         const bookmark = plainToClass<BookmarkMaster, T>(BookmarkMaster, prof);
    //         bookmark.professional = masterRaw ? plainToClass(Master, masterRaw) : null;
    //
    //         return bookmark;
    //     });
    // }


}
