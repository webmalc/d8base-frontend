import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '@env/environment';
import {ApiListResponseFixture} from '../../../testing/fixtures/api-list-response-fixture';
import {BookmarkFixture} from '../../../testing/fixtures/bookmark-fixture';
import {Autofixture} from '../../../testing/fixtures/generator';
import {MasterFixture} from '../../../testing/fixtures/master-fixture';
import {SavedProfessionalFixture} from '../../../testing/fixtures/saved-professional-fixture';
import {SavedProfessionalInterface} from '../../core/interfaces/saved-professional.interface';
import {Master} from '../../core/models/master';
import {SavedProfessionalApiService} from './saved-professional-api.service';

describe('SavedProfessionalApiService', () => {
    let service: SavedProfessionalApiService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SavedProfessionalApiService],
        });
        service = TestBed.inject(SavedProfessionalApiService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should perform getAll$ method', () => {

        const savedFixture = SavedProfessionalFixture.create();
        const autoFixture = new Autofixture();
        const resultFixtures = autoFixture.createMany(savedFixture, 2);
        const listFixture = ApiListResponseFixture
            .create<SavedProfessionalInterface<number>>(resultFixtures);

        service.getAll$().subscribe(
            data => {
                expect(data.length).toBe(2);
                expect(data).toEqual(resultFixtures);
            },
        );

        const request = httpTestingController
            .expectOne(`${environment.backend.url}${environment.backend.saved_professionals}`);
        expect(request.request.method).toBe('GET');
        request.flush(listFixture);
    });

    it ('should be able to create item', () => {
        const master: Master = MasterFixture.create();

        const note = 'some note';
        const answer = SavedProfessionalFixture.create();
        answer.note = note;
        answer.professional = master.id;

        service.create(answer).subscribe(
            data => expect(data).toEqual(answer),
        );

        const request = httpTestingController
            .expectOne(`${environment.backend.url}${environment.backend.saved_professionals}`);
        expect(request.request.method).toBe('POST');
        expect(request.request.body).toEqual(answer);

        request.flush(answer);
    });

    it ('should be able to getById method', () => {
        const answer = SavedProfessionalFixture.create();

        service.getById(answer.id).subscribe(
            data => expect(data).toEqual(answer),
        );

        const request = httpTestingController
            .expectOne(`${environment.backend.url}${environment.backend.saved_professionals}${answer.id}/`);
        expect(request.request.method).toBe('GET');

        request.flush(answer);
    });

    it ('should be able to remove item', () => {
        const master = MasterFixture.create();
        const bookmark = BookmarkFixture.create(master);

        service.remove(bookmark).subscribe(
            data => expect(data).toBeNull(),
        );

        const request = httpTestingController
            .expectOne(`${environment.backend.url}${environment.backend.saved_professionals}${bookmark.id}/`);
        expect(request.request.method).toBe('DELETE');
        request.flush(null, {status: 204, statusText: ''});
    });
});

