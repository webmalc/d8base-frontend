import {Component} from '@angular/core';
import {HelperService} from '@app/core/services/helper.service';
import MasterProfileContext from '@app/master/interfaces/master-profile-context.interface';
import {MasterProfileContextService} from '@app/master/services/master-profile-context.service';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-master-profile-info',
    templateUrl: './master-profile-info.component.html',
    styleUrls: ['./master-profile-info.component.scss']
})
export class MasterProfileInfoComponent {

    public context$: Observable<MasterProfileContext>;
    public readonly editDefaultUrl = 'professional-contact-add-default/';
    public readonly editUrl = 'professional-contact-edit/';
    public readonly addUrl = 'professional-contact-add/';

    constructor(context: MasterProfileContextService) {
        this.context$ = context.context$.pipe(
            first(({user, master}) => Boolean(master) && Boolean(user))
        );
    }

    public declinationYears(num: number): string {
        return HelperService.declination(num, ['declination.years.1', 'declination.years.2', 'declination.years.3']);
    }

    public getYearsFromBirthday(birthday: string): number {
        return HelperService.calculateAge(birthday);
    }
}
