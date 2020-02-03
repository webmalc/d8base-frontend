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

    xit('should be created', () => {
        const service: PasswordRecoveryService = TestBed.get(PasswordRecoveryService);
        expect(service).toBeTruthy();
    });
});
