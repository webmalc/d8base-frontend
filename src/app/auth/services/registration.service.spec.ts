import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {IonicStorageModule} from '@ionic/storage';
import {of} from 'rxjs';
import {LocationServiceMock, StorageManagerMock} from 'src/testing/mocks';
import {User} from '../../core/models/user';
import {StorageManagerService} from '../../core/proxies/storage-manager.service';
import {ApiClientService} from '../../core/services/api-client.service';
import {LocationService} from '../../core/services/location/location.service';
import {AuthResponseInterface} from '../interfaces/auth-response.interface';
import {RegistrationService} from './registration.service';

describe('RegistrationService', () => {
    const userModel = new User();
    userModel.first_name = 'name';
    userModel.last_name = 'lastName';
    userModel.password = 'pass';
    userModel.password_confirm = 'pass';
    const tokenData: AuthResponseInterface = {
        access_token: 'string',
        expires_in: 123,
        token_type: 'string',
        scope: 'string',
        refresh_token: 'string',
    };

    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            IonicStorageModule.forRoot(),
            HttpClientTestingModule,
        ],
        providers: [
            RegistrationService,
            {provide: StorageManagerService, useClass: StorageManagerMock},
            {provide: LocationService, useClass: LocationServiceMock},
            {provide: ApiClientService, useValue: {post: () => of({token: tokenData, ...userModel})}},
        ],
    }));

    it('should be created', () => {
        const service: RegistrationService = TestBed.inject(RegistrationService);
        expect(service).toBeTruthy();
    });

    it('test #register', (done) => {
        const service: RegistrationService = TestBed.inject(RegistrationService);
        service.register(
            userModel,
        ).subscribe(
            res => {
                expect(res).toBeTruthy();
                done();
            },
        );
    });
});
