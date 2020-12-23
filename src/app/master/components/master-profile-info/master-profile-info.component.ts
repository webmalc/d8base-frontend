import {Component} from '@angular/core';
import {HelperService} from '@app/core/services/helper.service';
import MasterProfileContext from '@app/master/interfaces/master-profile-context.interface';
import {MasterProfileContextService} from '@app/master/services/master-profile-context.service';
import {Language} from '@app/profile/models/language';
import {LanguagesApiService} from '@app/profile/services/languages-api.service';
import {UserLanguagesApiService} from '@app/profile/services/user-languages-api.service';
import {Observable} from 'rxjs';
import {first, map, shareReplay, switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-master-profile-info',
    templateUrl: './master-profile-info.component.html',
    styleUrls: ['./master-profile-info.component.scss']
})
export class MasterProfileInfoComponent {

    public context$: Observable<MasterProfileContext>;
    public languages$: Observable<Language[]>;
    public readonly editDefaultUrl = 'professional-contact-add-default/';
    public readonly editUrl = 'professional-contact-edit/';
    public readonly addUrl = 'professional-contact-add/';

    constructor(
        context: MasterProfileContextService,
        userLanguagesApi: UserLanguagesApiService,
        languagesApi: LanguagesApiService
    ) {
        this.context$ = context.context$.pipe(
            first(({user, master}) => Boolean(master) && Boolean(user))
        );
        this.languages$ = this.context$.pipe(
            map(({user}) => user.languages as number[]),
            switchMap(ids => userLanguagesApi.getList(ids)),
            switchMap(languages => languagesApi.getList(languages.map(lang => lang?.language))),
            shareReplay(1)
        );
    }

    public declinationYears(num: number): string {
        return HelperService.declination(num, ['declination.years.1', 'declination.years.2', 'declination.years.3']);
    }

    public getYearsFromBirthday(birthday: string): number {
        return HelperService.calculateAge(birthday);
    }
}
