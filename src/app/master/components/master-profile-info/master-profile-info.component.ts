import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PartialUserInterface} from '@app/core/interfaces/partial-user-interface';
import {Master} from '@app/core/models/master';
import {HelperService} from '@app/core/services/helper.service';
import {Certificate} from '@app/master/models/certificate';
import {Education} from '@app/master/models/education';
import {Experience} from '@app/master/models/experience';
import {MasterContact} from '@app/master/models/master-contact';
import {MasterLocation} from '@app/master/models/master-location';
import {PublicReview} from '@app/master/models/public-review';
import {Tag} from '@app/master/models/tag';
import {MasterContactsApiService} from '@app/master/services/master-contacts-api.service';
import {MasterProfileInfoGeneratorFactoryService} from '@app/master/services/master-profile-info-generator-factory.service';
import {Country} from '@app/profile/models/country';
import {Language} from '@app/profile/models/language';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-master-profile-info',
    templateUrl: './master-profile-info.component.html',
    styleUrls: ['./master-profile-info.component.scss'],
})
export class MasterProfileInfoComponent {

    public editable: Observable<boolean>;
    public master: Master;
    public masterLocation: MasterLocation[];
    public masterContacts: MasterContact[];
    public masterTags: Tag[];
    public user: PartialUserInterface;
    public userCountry: Country;
    public userLanguages: Language[];
    public experienceList: Experience[];
    public educationList: Education[];
    public certificateList: Certificate[];
    public publicReviewList: PublicReview[];
    public readonly editDefaultUrl = 'professional-contact-add-default/';
    public readonly editUrl = 'professional-contact-edit/';
    public readonly addUrl = 'professional-contact-add';


    constructor(
        public masterContactApi: MasterContactsApiService,
        private masterInfoGeneratorFactory: MasterProfileInfoGeneratorFactoryService,
        private route: ActivatedRoute
    ) {
    }

    public setEditable(editable: Observable<boolean>): void {
        this.editable = editable;
    }

    public init(): void {
        this.masterInfoGeneratorFactory.getData(parseInt(this.route.snapshot.paramMap.get('master-id'), 10)).subscribe(
            data => {
                this.master = data.master;
                this.masterLocation = data.masterLocation;
                this.masterContacts = data.masterContacts;
                this.masterTags = data.masterTags;
                this.user = data.user;
                this.userCountry = data.userCountry;
                this.userLanguages = data.userLanguages;
                this.experienceList = data.experienceList;
                this.certificateList = data.certificateList;
                this.publicReviewList = data.publicReviewList;
                this.educationList = data.educationList;
            }
        );
    }

    public declinationYears(num: number): string {
        return HelperService.declination(num, ['declination.years.1', 'declination.years.2', 'declination.years.3']);
    }

    public getYearsFromBirthday(birthday: string): number {
        return HelperService.calculateAge(birthday);
    }
}
