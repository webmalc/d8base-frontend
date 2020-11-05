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
import {map, switchMap, tap} from 'rxjs/operators';

@Injectable()
export class MasterProfileInfoGeneratorFactoryService {

    constructor(
        private readonly masterManager: MasterManagerService,
        private readonly masterLocationApi: MasterLocationApiService,
        private readonly masterContactApi: MasterContactsApiService,
        private readonly masterTagsApi: TagsApiService,
        private readonly userManager: UserManagerService,
        private readonly countriesApi: CountriesApiService,
        private readonly languagesApi: LanguagesApiService,
        private readonly userLanguagesApi: UserLanguagesApiService,
        private readonly masterExperienceApi: ExperienceApiService,
        private readonly masterEducationApi: EducationApiService,
        private readonly certificatesApi: CertificatesApiService,
        private readonly publicReviewsApi: ReviewsReadonlyApiService,
        private readonly masterReadonlyApi: MasterReadonlyApiService
    ) {
    }

    public getData(masterId?: number): Observable<{
        master: Master,
        masterLocation: MasterLocation[],
        masterContacts: MasterContact[],
        masterTags: Tag[],
        userCountry: Country | null,
        user: PartialUserInterface,
        userLanguages: Language[],
        experienceList: Experience[],
        certificateList: Certificate[],
        educationList: Education[],
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
        userCountry: Country | null,
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
                    userCountry: this.getUserCountry(master.user),
                    userLanguages: this.getUserLanguages(master.user),
                    user: of(master.user),
                    masterLocation: this.masterLocationApi.getByClientId(master.id, {ordering: 'created'}).pipe(map(res => res.results)),
                    masterContacts: this.masterContactApi.getByClientId(master.id, {ordering: 'created'}).pipe(map(res => res.results)),
                    masterTags: this.masterTagsApi.getByMasterId(master.id, {ordering: 'created'}).pipe(map(res => res.results)),
                    experienceList: this.masterExperienceApi.get({
                        professional: master.id.toString(),
                        ordering: 'created'
                    }).pipe(map(res => res.results)),
                    educationList: this.masterEducationApi.getByMasterId(master.id, {ordering: 'created'}).pipe(map(res => res.results)),
                    certificateList: this.certificatesApi.getByMasterId(master.id, {ordering: 'created'}).pipe(map(res => res.results)),
                    publicReviewList: this.publicReviewsApi.get({
                        professional: master.id.toString(),
                        ordering: 'created'
                    }).pipe(map(res => res.results))
                })
            )
        );
    }

    private getUserLanguages(user: PartialUserInterface): Observable<Language[]> {
        return (user.languages && user.languages.length !== 0) ?
            this.languagesApi.getList(user.languages.map(lang => lang.language)) :
            of([]);
    }

    private getUserCountry(user: PartialUserInterface): Observable<Country | null> {
        return user.nationality ? this.countriesApi.getByEntityId((user.nationality as number).toString(10)) : of(null);
    }
}
