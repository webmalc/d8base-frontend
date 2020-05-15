import {Injectable} from '@angular/core';
import {Observable, pipe} from 'rxjs';
import {SavedProfessionalInterface} from '@app/core/interfaces/saved-professional.interface';
import {ApiClientService} from '@app/core/services/api-client.service';
import {environment} from '../../../environments/environment';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {plainToClass} from 'class-transformer';
import {BookmarkMaster} from '@app/core/models/bookmark-master';
import {map} from 'rxjs/operators';

@Injectable()
export class BookmarksService {
    private readonly url = environment.backend.saved_professionals;

    constructor(private api: ApiClientService) {
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
