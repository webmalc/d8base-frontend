import {Injectable} from '@angular/core';
import {PartialUserInterface} from '@app/core/interfaces/partial-user-interface';
import {Master} from '@app/core/models/master';
import {CountriesApiService} from '@app/core/services/location/countries-api.service';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {Certificate} from '@app/master/models/certificate';
import {Education} from '@app/master/models/education';
import {Experience} from '@app/master/models/experience';
import {MasterContact} from '@app/master/models/master-contact';
import {MasterList} from '@app/master/models/master-list';
import {MasterLocation} from '@app/master/models/master-location';
import {PublicReview} from '@app/master/models/public-review';
import {Tag} from '@app/master/models/tag';
import {CertificatesApiService} from '@app/master/services/certificates-api.service';
import {EducationApiService} from '@app/master/services/education-api.service';
import {ExperienceApiService} from '@app/master/services/experience-api.service';
import {MasterContactsApiService} from '@app/master/services/master-contacts-api.service';
import {MasterLocationApiService} from '@app/master/services/master-location-api.service';
import {MasterReadonlyApiService} from '@app/master/services/master-readonly-api.service';
import {ReviewsReadonlyApiService} from '@app/master/services/reviews-readonly-api.service';
import {TagsApiService} from '@app/master/services/tags-api.service';
import {Country} from '@app/profile/models/country';
import {Language} from '@app/profile/models/language';
import {UserLanguage} from '@app/profile/models/user-language';
import {LanguagesApiService} from '@app/profile/services/languages-api.service';
import {UserLanguagesApiService} from '@app/profile/services/user-languages-api.service';
import {forkJoin, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable()
export class MasterProfileInfoGeneratorFactoryService {

    constructor(
        private masterManager: MasterManagerService,
        private masterLocationApi: MasterLocationApiService,
        private masterContactApi: MasterContactsApiService,
        private masterTagsApi: TagsApiService,
        private userManager: UserManagerService,
        private countriesApi: CountriesApiService,
        private languagesApi: LanguagesApiService,
        private userLanguagesApi: UserLanguagesApiService,
        private masterExperienceApi: ExperienceApiService,
        private masterEducationApi: EducationApiService,
        private certificatesApi: CertificatesApiService,
        private publicReviewsApi: ReviewsReadonlyApiService,
        private masterReadonlyApi: MasterReadonlyApiService
    ) {
    }

    public getData(masterId?: number): Observable<{
        master: Master,
        masterLocation: MasterLocation[],
        masterContacts: MasterContact[],
        masterTags: Tag[],
        user: PartialUserInterface,
        userCountry: Country,
        userLanguages: Language[],
        experienceList: Experience[],
        educationList: Education[],
        certificateList: Certificate[],
        publicReviewList: PublicReview[]
    }> {
        return masterId ? this.get(masterId) : this.masterManager.getMasterList().pipe(switchMap(list => this.get(list[0].id)));
    }

    private get(masterId: number): Observable<{
        master: Master,
        masterLocation: MasterLocation[],
        masterContacts: MasterContact[],
        masterTags: Tag[],
        user: PartialUserInterface,
        userCountry: Country,
        userLanguages: Language[],
        experienceList: Experience[],
        educationList: Education[],
        certificateList: Certificate[],
        publicReviewList: PublicReview[]
    }> {
        return this.masterReadonlyApi.getByEntityId(masterId).pipe(
            switchMap(
                (master: MasterList) => forkJoin({
                    master: of(master),
                    userCountry: this.countriesApi.getByEntityId((master.user.nationality as number).toString(10)),
                    userLanguages: this.userLanguagesApi.getList(master.user.languages.map(lang => parseInt(lang, 10))).pipe(
                        switchMap((userLanguagesList: UserLanguage[]) =>
                            this.languagesApi.getList(userLanguagesList.map(lang => lang.language)))),
                    user: of(master.user),
                    masterLocation: this.masterLocationApi.getByClientId(master.id).pipe(map(res => res.results)),
                    masterContacts: this.masterContactApi.getByClientId(master.id).pipe(map(res => res.results)),
                    masterTags: this.masterTagsApi.getByMasterId(master.id).pipe(map(res => res.results)),
                    experienceList: this.masterExperienceApi.get({professional: master.id.toString()}).pipe(map(res => res.results)),
                    educationList: this.masterEducationApi.getByMasterId(master.id).pipe(map(res => res.results)),
                    certificateList: this.certificatesApi.getByMasterId(master.id).pipe(map(res => res.results)),
                    publicReviewList: this.publicReviewsApi.get({professional: master.id.toString()}).pipe(map(res => res.results))
                })
            )
        );
    }
}
