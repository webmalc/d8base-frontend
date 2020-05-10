import {TestBed} from '@angular/core/testing';

import {EducationFormService} from './education-form.service';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EducationApiService} from '../services/education-api.service';
import {CertificateApiService} from '../services/certificate-api.service';

describe('EducationFormService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, HttpClientTestingModule],
        providers: [EducationFormService, EducationApiService, CertificateApiService]
    }));

    it('should be created', () => {
        const service: EducationFormService = TestBed.inject(EducationFormService);
        expect(service).toBeTruthy();
    });
    xit('should be some tests');
});
