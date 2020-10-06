import {Component} from '@angular/core';
import {Master} from '@app/core/models/master';
import {User} from '@app/core/models/user';
import {HelperService} from '@app/core/services/helper.service';
import {CountriesApiService} from '@app/core/services/location/countries-api.service';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {Certificate} from '@app/master/models/certificate';
import {Education} from '@app/master/models/education';
import {Experience} from '@app/master/models/experience';
import {MasterContact} from '@app/master/models/master-contact';
import {MasterLocation} from '@app/master/models/master-location';
import {Tag} from '@app/master/models/tag';
import {CertificatesApiService} from '@app/master/services/certificates-api.service';
import {EducationApiService} from '@app/master/services/education-api.service';
import {ExperienceApiService} from '@app/master/services/experience-api.service';
import {MasterContactsApiService} from '@app/master/services/master-contacts-api.service';
import {MasterLocationApiService} from '@app/master/services/master-location-api.service';
import {TagsApiService} from '@app/master/services/tags-api.service';
import {Country} from '@app/profile/models/country';
import {Language} from '@app/profile/models/language';
import {UserLanguage} from '@app/profile/models/user-language';
import {LanguagesApiService} from '@app/profile/services/languages-api.service';
import {UserLanguagesApiService} from '@app/profile/services/user-languages-api.service';
import {forkJoin} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

@Component({
    selector: 'app-master-profile-info',
    templateUrl: './master-profile-info.component.html',
    styleUrls: ['./master-profile-info.component.scss'],
})
export class MasterProfileInfoComponent {

    public master: Master;
    public masterLocation: MasterLocation[];
    public masterContacts: MasterContact[];
    public masterTags: Tag[];
    public user: User;
    public userCountry: Country;
    public userLanguages: Language[];
    public experienceList: Experience[];
    public educationList: Education[];
    public certificateList: Certificate[];
    public readonly editDefaultUrl = 'professional-contact-add-default/';
    public readonly editUrl = 'professional-contact-edit/';
    public readonly addUrl = 'professional-contact-add';


    constructor(
        private masterManager: MasterManagerService,
        private masterLocationApi: MasterLocationApiService,
        public masterContactApi: MasterContactsApiService,
        private masterTagsApi: TagsApiService,
        private userManager: UserManagerService,
        private countriesApi: CountriesApiService,
        private languagesApi: LanguagesApiService,
        private userLanguagesApi: UserLanguagesApiService,
        private masterExperienceApi: ExperienceApiService,
        private masterEducationApi: EducationApiService,
        private certificatesApi: CertificatesApiService
    ) {
    }

    public init(): void {
        this.userManager.getCurrentUser().pipe(
            tap(user => this.user = user)
        ).subscribe(
            user => {
                this.countriesApi.getByEntityId((user.nationality as number).toString(10)).subscribe(
                    country => this.userCountry = country
                );
                this.userLanguagesApi.getList(user.languages.map(lang => parseInt(lang, 10))).subscribe(
                    (userLanguagesList: UserLanguage[]) => this.languagesApi.getList(userLanguagesList.map(lang => lang.language))
                        .subscribe(languagesList => this.userLanguages = languagesList)
                );
            }
        );
        this.userManager.getCurrentUser().pipe(
            tap(user => this.user = user),
            switchMap((user: User) => this.countriesApi.getByEntityId((user.nationality as number).toString(10)))
        ).subscribe(
            country => this.userCountry = country
        );
        this.masterManager.getMasterList().pipe(
            tap(list => this.master = list[0])
        ).subscribe(
            list => forkJoin({
                masterLocationList: this.masterLocationApi.getByClientId(list[0].id),
                masterContactList: this.masterContactApi.getByClientId(list[0].id),
                masterTagList: this.masterTagsApi.getByMasterId(list[0].id),
                masterExperienceList: this.masterExperienceApi.get({professional: list[0].id.toString(10)}),
                educationList: this.masterEducationApi.getByMasterId(list[0].id),
                certificateList: this.certificatesApi.getByMasterId(list[0].id)
            }).subscribe(
                ({masterLocationList, masterContactList, masterTagList, masterExperienceList, educationList, certificateList}) => {
                    this.masterLocation = masterLocationList.results;
                    this.masterContacts = masterContactList.results;
                    this.masterTags = masterTagList.results;
                    this.experienceList = masterExperienceList.results;
                    this.educationList = educationList.results;
                    this.certificateList = certificateList.results;
                }
            )
        );
    }

    public declinationYears(num: number): string {
        return HelperService.declination(num, ['declination.years.1', 'declination.years.2', 'declination.years.3']);
    }

    public getYearsFromBirthday(birthday: string): number {
        return HelperService.calculateAge(birthday);
    }
}
