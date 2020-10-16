import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {StorageManagerService} from '../../core/proxies/storage-manager.service';
import {StorageManagerMock} from '../../core/services/token-manager.service.spec';
import {CertificatesApiService} from './certificates-api.service';
import {EducationApiService} from './education-api.service';
import {ExperienceApiService} from './experience-api.service';
import {MasterProfileInfoGeneratorFactoryService} from './master-profile-info-generator-factory.service';
import {ReviewsReadonlyApiService} from './reviews-readonly-api.service';

describe('MasterProfileInfoGeneratorFactoryService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
        ],
        providers: [
            MasterProfileInfoGeneratorFactoryService,
            ExperienceApiService,
            EducationApiService,
            CertificatesApiService,
            ReviewsReadonlyApiService,
            {provide: StorageManagerService, useClass: StorageManagerMock}
        ]
    }));

    it('should be created', () => {
        const service: MasterProfileInfoGeneratorFactoryService = TestBed.inject(MasterProfileInfoGeneratorFactoryService);
        expect(service).toBeTruthy();
    });
});
