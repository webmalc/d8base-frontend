import {TestBed} from '@angular/core/testing';

import {MasterManagerService} from './master-manager.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../../environments/environment';
import {ApiListResponseFixture} from '../../../testing/fixtures/api-list-response-fixture';
import {MasterInterface} from '../interfaces/master.interface';
import {MasterFixture} from '../../../testing/fixtures/master-fixture';
import {Autofixture} from '../../../testing/fixtures/generator';

describe('MasterManagerService', () => {
    let service: MasterManagerService;
    let httpController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                MasterManagerService
            ]
        });
        service = TestBed.inject(MasterManagerService);
        httpController = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should perform getUserLessList method', () => {
        const masterTemplate = MasterFixture.create();
        const autoFixture = new Autofixture();
        const masters = autoFixture.createMany<MasterInterface>(masterTemplate);
        const dataFixture = ApiListResponseFixture.create<MasterInterface>(masters);
        service.getUserLessList$([1, 2, 3]).subscribe(
            data => expect(data).toEqual(masters)
        );
        const requests = httpController.expectOne(`${environment.backend.url}${environment.backend.master_list}?pk_in=1,2,3`);
        requests.flush(dataFixture);
    });

    xit('should be some tests');
});
