import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {Master} from '@app/core/models/master';
import {User} from '@app/core/models/user';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {MasterProfileSubmenu} from '@app/master/enums/master-profile-submenu';
import {MainInfoSectionComponentInputDataInterface} from '@app/master/interfaces/main-info-section-component-input-data-interface';
import {PublicReview} from '@app/master/models/public-review';
import {ReviewsReadonlyApiService} from '@app/master/services/reviews-readonly-api.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {BehaviorSubject, forkJoin} from 'rxjs';

@Component({
    selector: 'app-master',
    templateUrl: './master.page.html',
    styleUrls: ['./master.page.scss']
})
export class MasterPage extends Reinitable {

    public defaultTab: string = MasterProfileSubmenu.Info;
    public tab: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultTab);
    public mainInfoSectionData: MainInfoSectionComponentInputDataInterface;
    public editable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private readonly masterManager: MasterManagerService,
        private readonly userManager: UserManagerService,
        private readonly reviewsReadonly: ReviewsReadonlyApiService,
        private readonly route: ActivatedRoute
    ) {
        super();
    }

    public selectTab(tab: string): void {
        this.tab.next(tab);
    }

    protected init(): void {
        this.initMainInfoSectionData();
        this.route.data.subscribe(data => this.editable.next(data.editable));
    }

    private initMainInfoSectionData(): void {
        forkJoin({
            masterList: this.masterManager.getMasterList(),
            user: this.userManager.getCurrentUser()
        }).subscribe(
            ({masterList, user}) => this.reviewsReadonly.get({professional: masterList[0].id.toString()}).subscribe(
                reviews => this.mainInfoSectionData = {
                    fullName: `${(user as User).last_name} ${(user as User).first_name}`,
                    company: (masterList[0] as Master)?.company,
                    avatar: (user as User).avatar,
                    rating: (masterList[0] as Master)?.rating,
                    reviews: (reviews as ApiListResponseInterface<PublicReview>).results,
                    is_confirmed: (user as User).is_confirmed
                }
            )
        );
    }
}
