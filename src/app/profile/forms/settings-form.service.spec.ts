import {TestBed} from '@angular/core/testing';

import {ReactiveFormsModule} from '@angular/forms';
import {SettingsFormService} from './settings-form.service';

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
