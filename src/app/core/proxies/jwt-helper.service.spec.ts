import {TestBed} from '@angular/core/testing';

import {JwtHelper} from './jwt-helper.service';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';

describe('JwtHelper', () => {

    beforeEach(() => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule,
            platformBrowserDynamicTesting());
    });

    beforeEach(() => TestBed.configureTestingModule({}));

    it('test #decodeToken', () => {
        const service: JwtHelper = TestBed.get(JwtHelper);
        expect(service).toBeTruthy();

        const refreshToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsIm' +
            'V4cCI6MTY2NjUyMTE2MCwianRpIjoiMDMyZTgwZjA5YjkyNGM2Njg2ZWU0YjIzMzI3OTU5YmQiLCJ1c2VyX2lkIj' +
            'ozfQ.RgncOyqF5zqJnFSJMLfRn6bfVblMWPzlw4V-JBvDYD8';

        const data = service.decodeToken(refreshToken);

        expect(data.token_type).toEqual('refresh');
        expect(data.user_id).toEqual(3);
        expect(data.exp).toEqual(1666521160);
    });
});
