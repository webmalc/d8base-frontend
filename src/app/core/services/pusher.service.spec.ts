import {TestBed} from '@angular/core/testing';

import {PusherService} from './pusher.service';
import {AngularFireModule} from '@angular/fire';

describe('PusherService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            AngularFireModule.initializeApp({})
        ],
        providers: [PusherService]
    }));

    it('should be created', () => {
        const service: PusherService = TestBed.inject(PusherService);
        expect(service).toBeTruthy();
    });
});
