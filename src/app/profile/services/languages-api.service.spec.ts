import {of} from 'rxjs';
import {ApiListResponseInterface} from '../../core/interfaces/api-list-response.interface';
import {ApiClientService} from '../../core/services/api-client.service';
import {Language} from '../models/language';
import {LanguagesApiService} from './languages-api.service';

describe('LanguageApiService', () => {
    let apiClientServiceSpy: { get: jasmine.Spy };
    let languagesApiService: LanguagesApiService;


    beforeEach(() => {
        apiClientServiceSpy = jasmine.createSpyObj<ApiClientService>('ApiClientService', ['get']);
        languagesApiService = new LanguagesApiService(apiClientServiceSpy as any);
    });
    it('should return empty array of languages', () => {
        const data: ApiListResponseInterface<Language> = {
            count: 0,
            results: [],
            next: null,
            previous: null
        };
        apiClientServiceSpy.get.and.returnValue(of(data));
        languagesApiService.getLanguages().subscribe(
            languages => {
                expect(languages).toEqual([]);
            }
        );
    });

    it('should return array of languages', () => {
        const language1 = new Language();
        language1.id = 0;
        language1.code = 'ru';
        language1.name = 'russian';
        const language2 = new Language();
        language2.id = 1;
        language2.code = 'en';
        language2.name = 'english';
        const data: ApiListResponseInterface<Language> = {
            count: 2,
            results: [
                {
                    id: 0,
                    code: 'ru',
                    name: 'russian'
                },
                {
                    id: 1,
                    code: 'en',
                    name: 'english'
                }
            ],
            next: null,
            previous: null
        };
        apiClientServiceSpy.get.and.returnValue(of(data));
        languagesApiService.getLanguages().subscribe(
            languages => {
                expect(languages).toEqual([
                    language1,
                    language2
                ]);
            }
        );
    });
});
