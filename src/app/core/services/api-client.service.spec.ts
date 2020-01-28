import {TestBed} from '@angular/core/testing';

import {ApiClientService} from './api-client.service';
import {HttpClient} from '@angular/common/http';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';

describe('ApiClientService', () => {
    beforeEach(() => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule,
            platformBrowserDynamicTesting());
    });
    beforeEach(async () => TestBed.configureTestingModule({
        providers: [
            {provide: HttpClient, useClass: HttpMock}
        ]
    }));

    it('should be created', () => {
        const service: ApiClientService = TestBed.get(ApiClientService);
        expect(service).toBeTruthy();
    });
});


export class HttpMock {
    public get(...args) {
    }

    public post(...args) {
    }
}
