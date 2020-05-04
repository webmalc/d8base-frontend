import {TestBed} from '@angular/core/testing';

import {AppInitService} from './app-init.service';
import {Platform} from '@ionic/angular';
import {TranslationService} from './translation.service';

describe('AppInitService', () => {

    let trans: TranslationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: Platform, useValue: {ready: () => Promise.resolve()}},
                {provide: TranslationService, useValue: {init: () => { return; }}}
            ],
        });

        trans = TestBed.get(TranslationService);

        spyOn(trans, 'init');
    });

    xit('should be created', () => {
        const service: AppInitService = TestBed.get(AppInitService);
        expect(service).toBeTruthy();
    });

    xit('test translate service init', (done) => {
        const service: AppInitService = TestBed.get(AppInitService);

        service.init().then(
            res => {
                expect((service as any).translationService.init).toHaveBeenCalled();
                done();
            }
        );
    });
});
