import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {SavedProfessionalApiService} from '@app/profile/services/saved-professional-api.service';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {Observable} from 'rxjs';
import {SavedProfessionalInterface} from '@app/core/interfaces/saved-professional.interface';
import {map, switchMap} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';
import {Master} from '@app/core/models/master';
import {BookmarkMaster} from '@app/core/models/bookmark-master';
import {MasterInterface} from '@app/core/interfaces/master.interface';


@Injectable()
export class BookmarksService {
    private readonly url = environment.backend.saved_professionals;

    constructor(
        private savedService: SavedProfessionalApiService,
        private masterManager: MasterManagerService
    ) {
    }

    public getAll$(): Observable<BookmarkMaster[]> {
        let savedProfs: SavedProfessionalInterface<number>[];

        return this.savedService.getAll$()
            .pipe(
                map(value => {
                    savedProfs = value;

                    return value.map(({id}) => id);
                }),
                switchMap(value => this.masterManager.getUserLessList$(value)),
                map((value: MasterInterface[]) => {
                    return savedProfs.map<BookmarkMaster>(prof => {
                        const masterId: number = prof.professional;
                        const masterRaw: MasterInterface = value.find((master) => master.id === masterId);
                        const bookmark = plainToClass<BookmarkMaster, SavedProfessionalInterface<number>>(BookmarkMaster, prof);
                        if (masterRaw) {
                            bookmark.professional = plainToClass(Master, masterRaw);
                        } else {
                            bookmark.professional = null;
                        }

                        return bookmark;
                    });
                })
            );
    }


    // public createBookMark$(professional: Master): Observable<null>: void {
    //     return of();
    // }
    //
    // public removeBookMark(bookMark: SavedProfessionalInterface<any>): void {
    //
    // }

}
