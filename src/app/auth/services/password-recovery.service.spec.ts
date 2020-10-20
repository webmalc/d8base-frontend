import {TestBed} from '@angular/core/testing';

import {of} from 'rxjs';
import {ApiClientService} from '../../core/services/api-client.service';
import {PasswordRecoveryService} from './password-recovery.service';

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
