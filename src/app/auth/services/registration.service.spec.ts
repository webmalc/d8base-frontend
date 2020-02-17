import {TestBed} from '@angular/core/testing';

import {of} from 'rxjs';
import {ApiClientService} from '../../core/services/api-client.service';
import {LocationService} from '../../core/services/location/location.service';
import {User} from '../../shared/models/user';
import {RegistrationService} from './registration.service';
import {plainToClass} from 'class-transformer';
import {LocationModel} from '../../core/models/location.model';

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

        const user = {
            firstName: 'testName',
            password: 'testPass',
            email: 'test@test.te'
        };
        const location = {
            country: 'testCountry',
            city: 'testCity'
        };

        service.register(
            plainToClass(User, user, { excludeExtraneousValues: true }),
            plainToClass(LocationModel, location, { excludeExtraneousValues: true })
        ).subscribe(
            res => {
                expect(res).toBeTruthy();
                done();
            }
        );
    });
});
