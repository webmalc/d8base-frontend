import {TestBed} from '@angular/core/testing';

import {SettingsFormService} from './settings-form.service';
import {ReactiveFormsModule} from '@angular/forms';

describe('SettingsFormService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [ReactiveFormsModule],
        providers: [SettingsFormService]
    }));

    it('should be created', () => {
        const service: SettingsFormService = TestBed.inject(SettingsFormService);
        expect(service).toBeTruthy();
    });
    xit('should be some tests');
});
