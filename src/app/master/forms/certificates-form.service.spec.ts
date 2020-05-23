import { TestBed } from '@angular/core/testing';

import {ReactiveFormsModule} from '@angular/forms';
import { CertificatesFormService } from './certificates-form.service';

describe('CertificatesFormService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            ReactiveFormsModule
        ],
        providers: [
            CertificatesFormService
        ]
    }));

    it('should be created', () => {
        const service: CertificatesFormService = TestBed.inject(CertificatesFormService);
        expect(service).toBeTruthy();
    });
});
