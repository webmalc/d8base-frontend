import {TestBed} from '@angular/core/testing';

import {JwtHelper} from './jwt-helper.service';

describe('JwtHelper', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: JwtHelper = TestBed.get(JwtHelper);
        expect(service).toBeTruthy();
    });
});
