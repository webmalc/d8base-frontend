import {TestBed} from '@angular/core/testing';

import {AuthenticationFactory} from '../../core/services/authentication-factory.service';
import {UserManagerService} from '../../core/services/user-manager.service';
import {ProfileService} from './profile.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';


class ProfileServiceStub {
}


describe('ProfileService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, ReactiveFormsModule],
        providers: [
            ProfileService
        ]
    }));

    it('should be created', () => {
        const service: ProfileService = TestBed.inject(ProfileService);
        expect(service).toBeTruthy();
    });

    xit('should do some tests');
});
