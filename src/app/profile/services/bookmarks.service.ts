import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {SavedProfessionalApiService} from '@app/profile/services/saved-professional-api.service';
import {Observable} from 'rxjs';
import {BookMarkInterface, SavedProfessionalInterface} from '@app/core/interfaces/saved-professional.interface';
import {map} from 'rxjs/operators';

@Injectable()
export class BookmarksService {
    private readonly url = environment.backend.saved_professionals;

    constructor(
        private savedService: SavedProfessionalApiService,

    ) {
    }

    public getAll$(): Observable<BookMarkInterface[]> {
        return this.savedService.getAll$<SavedProfessionalInterface<number>[]>();
    }

    // private master: Master = {
    //     id: 0,
    //     name: 'ProfiTest1',
    //     company: 'MyCompany',
    //     description: 'SomeDescription',
    //     experience: 3,
    //     is_auto_order_confirmation: false,
    //     level: 'advanced',
    //     subcategory: 0
    // };
    //
    // private bookmark: SavedProfessionalInterface<Master> = {
    //     id: 0,
    //     professional: this.master,
    //     created: '',
    //     created_by: 0,
    //     modified: '',
    //     modified_by: 2,
    //     note: 'note'
    // };

    // public createBookMark$(professional: Master): Observable<null>: void {
    //     return of();
    // }
    //
    // public removeBookMark(bookMark: SavedProfessionalInterface<any>): void {
    //
    // }

}
