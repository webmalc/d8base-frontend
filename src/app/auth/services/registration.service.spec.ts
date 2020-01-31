import {TestBed} from '@angular/core/testing';

import {RegistrationService} from './registration.service';
import {ApiClientService} from '../../core/services/api-client.service';
import {of} from 'rxjs';
import {LocationService} from './location/location.service';
import {User} from '../../shared/models/user';

describe('RegistrationService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            RegistrationService,
            {provide: ApiClientService, useValue: {post: () => of(true)}},
            {provide: LocationService, useValue: {getIpData: () => of(null)}}
        ]
    }));

    it('should be created', () => {
        const service: RegistrationService = TestBed.get(RegistrationService);
        expect(service).toBeTruthy();
    });

    it('test #register', (done) => {
        const service: RegistrationService = TestBed.get(RegistrationService);

        const user: User = new User();
        user.username = 'user';
        user.password = 'pass';

        service.register(user).subscribe(
            res => {
                expect(res).toBeTruthy();
                done();
            }
        );
    });
});
