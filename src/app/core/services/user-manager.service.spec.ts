import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {StorageManagerService} from '../proxies/storage-manager.service';
import {StorageManagerMock} from './token-manager.service.spec';
import {UserManagerService} from './user-manager.service';

describe('UserManagerService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            UserManagerService,
            {provide: StorageManagerService, useClass: StorageManagerMock}
        ]
    }));

    it('should be created', () => {
        const service: UserManagerService = TestBed.inject(UserManagerService);
        expect(service).toBeTruthy();
    });

    xit('should be some tests');
});
