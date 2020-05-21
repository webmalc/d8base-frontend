import {TestBed} from '@angular/core/testing';

import {ReactiveFormsModule} from '@angular/forms';
import {EditMasterFormService} from './edit-master-form.service';
import {EducationFormService} from './education-form.service';

describe('EducationFormService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            ReactiveFormsModule
        ],
        providers: [
            EditMasterFormService
        ]
    }));

    it('should be created', () => {
        const service: EducationFormService = TestBed.inject(EducationFormService);
        expect(service).toBeTruthy();
    });
});
