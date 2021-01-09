import { ApiClientService } from '@app/core/services/api-client.service';
import { of } from 'rxjs';
import { Language } from '../models/language';
import { LanguagesApiService } from './languages-api.service';

describe('LanguageApiService', () => {
    let apiClientServiceSpy: { get: jasmine.Spy };
    let languagesApiService: LanguagesApiService;


    beforeEach(() => {
        apiClientServiceSpy = jasmine.createSpyObj<ApiClientService>('ApiClientService', ['get']);
        languagesApiService = new LanguagesApiService(apiClientServiceSpy as any);
    });
    it('should return empty array of languages', () => {
        apiClientServiceSpy.get.and.returnValue(of([]));
        languagesApiService.getLanguages$().subscribe(
            languages => {
                expect(languages).toEqual([]);
            },
        );
    });

    it('should return array of languages', () => {
        const language1 = new Language();
        language1.code = 'ru';
        language1.name = 'russian';
        const language2 = new Language();
        language2.code = 'en';
        language2.name = 'english';
        const data: Language[] =
            [
                {
                    code: 'ru',
                    name: 'russian',
                },
                {
                    code: 'en',
                    name: 'english',
                },
            ];

        apiClientServiceSpy.get.and.returnValue(of(data));
        languagesApiService.getLanguages$().subscribe(
            languages => {
                expect(languages).toEqual([
                    language1,
                    language2,
                ]);
            },
        );
    });
});
