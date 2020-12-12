import {Injectable} from '@angular/core';
import {PartialUserInterface} from '@app/core/interfaces/partial-user-interface';
import {Master} from '@app/core/models/master';
import {CountriesApiService} from '@app/core/services/location/countries-api.service';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {Certificate} from '@app/master/models/certificate';
import {Education} from '@app/master/models/education';
import {Experience} from '@app/master/models/experience';
import {MasterContact} from '@app/master/models/master-contact';
import {MasterList} from '@app/master/models/master-list';
import {MasterLocation} from '@app/master/models/master-location';
import {PublicReview} from '@app/master/models/public-review';
import {Tag} from '@app/master/models/tag';
import {MasterCertificatesReadonlyApiService} from '@app/master/services/master-certificates-readonly-api.service';
import {MasterContactsReadonlyApiService} from '@app/master/services/master-contacts-readonly-api.service';
import {MasterEducationReadonlyApiService} from '@app/master/services/master-education-readonly-api.service';
import {MasterExperienceReadonlyApiService} from '@app/master/services/master-experience-readonly-api.service';
import {MasterLocationsReadonlyApiService} from '@app/master/services/master-locations-readonly-api.service';
import {MasterReadonlyApiService} from '@app/master/services/master-readonly-api.service';
import {ReviewsReadonlyApiService} from '@app/master/services/reviews-readonly-api.service';
import {TagsReadonlyApiService} from '@app/master/services/tags-readonly-api.service';
import {Country} from '@app/profile/models/country';
import {Language} from '@app/profile/models/language';
import {UserLanguage} from '@app/profile/models/user-language';
import {LanguagesApiService} from '@app/profile/services/languages-api.service';
import {forkJoin, Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable()
export class MasterProfileInfoGeneratorFactoryService {

    constructor(
        private readonly masterManager: MasterManagerService,
        private readonly countriesApi: CountriesApiService,
        private readonly languagesApi: LanguagesApiService,
        private readonly publicReviewsApi: ReviewsReadonlyApiService,
        private readonly masterReadonlyApi: MasterReadonlyApiService,
        private readonly masterTagsReadonlyApi: TagsReadonlyApiService,
        private readonly masterContactReadonlyApi: MasterContactsReadonlyApiService,
        private readonly masterLocationReadonlyApi: MasterLocationsReadonlyApiService,
        private readonly masterExperienceReadonlyApi: MasterExperienceReadonlyApiService,
        private readonly masterEducationReadonlyApi: MasterEducationReadonlyApiService,
        private readonly masterCertificatesReadonlyApi: MasterCertificatesReadonlyApiService
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
                    masterLocation: this.getLocations(master.id),
                    masterContacts: this.getContacts(master.id),
                    masterTags: this.getTags(master.id),
                    experienceList: this.getExperience(master.id),
                    educationList: this.getEducation(master.id),
                    certificateList: this.getCertificates(master.id),
                    publicReviewList: this.publicReviewsApi.get({
                        professional: master.id.toString(),
                        ordering: 'created'
                    }).pipe(map(res => res.results))
                })
            )
        );
    }

    private getCertificates(masterId: number): Observable<Certificate[]> {
        return this.masterCertificatesReadonlyApi.getByMasterId(masterId).pipe(map(res => res.results));
    }

    private getExperience(masterId: number): Observable<Experience[]> {
        return this.masterExperienceReadonlyApi.getByMasterId(masterId).pipe(map(res => res.results));
    }

    private getEducation(masterId: number): Observable<Education[]> {
        return this.masterEducationReadonlyApi.getByMasterId(masterId).pipe(map(res => res.results));
    }

    private getTags(masterId: number): Observable<Tag[]> {
        return this.masterTagsReadonlyApi.getByMasterId(masterId).pipe(map(res => res.results));
    }

    private getContacts(masterId: number): Observable<MasterContact[]> {
        return this.masterContactReadonlyApi.getByClientId(masterId).pipe(map(res => res.results));
    }

    private getLocations(masterId: number): Observable<MasterLocation[]> {
        return this.masterLocationReadonlyApi.getByMasterId(masterId).pipe(map(res => res.results));
    }

    private getUserLanguages(user: PartialUserInterface): Observable<Language[]> {
        return (user.languages && user.languages.length !== 0) ?
            this.languagesApi.getList((user.languages as UserLanguage[]).map(lang => lang.language)) :
            of([]);
    }

    private getUserCountry(user: PartialUserInterface): Observable<Country | null> {
        return user.nationality ? this.countriesApi.getByEntityId((user.nationality as number).toString(10)) : of(null);
    }
}
