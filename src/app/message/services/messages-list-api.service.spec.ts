import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MessagesListApiService} from './messages-list-api.service';

describe('MessagesListApiService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            MessagesListApiService
        ]
    }));

    it('should be created', () => {
        const service: MessagesListApiService = TestBed.inject(MessagesListApiService);
        expect(service).toBeTruthy();
    });
});
