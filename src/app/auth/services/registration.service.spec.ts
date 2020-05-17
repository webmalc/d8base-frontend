import {TestBed} from '@angular/core/testing';

import {IonicStorageModule} from '@ionic/storage';
import {plainToClass} from 'class-transformer';
import {of} from 'rxjs';
import {User} from '../../core/models/user';
import {UserLocation} from '../../core/models/user-location';
import {ApiClientService} from '../../core/services/api-client.service';
import {LocationService} from '../../core/services/location/location.service';
import {RegistrationService} from './registration.service';

describe('RegistrationService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            IonicStorageModule.forRoot()
        ],
        providers: [
            RegistrationService,
            {provide: ApiClientService, useValue: {post: () => of(true)}},
            {provide: LocationService, useValue: {getIpData: () => of(null)}},
        ]
    }));

    it('should be created', () => {
        const service: RegistrationService = TestBed.inject(RegistrationService);
        expect(service).toBeTruthy();
    });

    it('test #register', (done) => {
        const service: RegistrationService = TestBed.inject(RegistrationService);

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
            plainToClass(UserLocation, location, { excludeExtraneousValues: true })
        ).subscribe(
            res => {
                expect(res).toBeTruthy();
                done();
            }
        );
    });
});
