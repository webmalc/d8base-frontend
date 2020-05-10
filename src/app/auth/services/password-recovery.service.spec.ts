import {TestBed} from '@angular/core/testing';

import {PasswordRecoveryService} from './password-recovery.service';
import {ApiClientService} from '../../core/services/api-client.service';
import {of} from 'rxjs';

describe('PasswordRecoveryService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            PasswordRecoveryService,
            {provide: ApiClientService, useValue: {post: () => of()}}
        ]
    }));

    it('should be created', () => {
        const service: PasswordRecoveryService = TestBed.inject(PasswordRecoveryService);
        expect(service).toBeTruthy();
    });

    xit('should be some tests');
});
