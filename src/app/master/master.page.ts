import {Component} from '@angular/core';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {Master} from '@app/core/models/master';
import {Review} from '@app/core/models/review';
import {User} from '@app/core/models/user';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {ReviewsApiService} from '@app/core/services/reviews-api.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {MasterProfileSubmenu} from '@app/master/enums/master-profile-submenu';
import {MainInfoSectionComponentInputDataInterface} from '@app/master/interfaces/main-info-section-component-input-data-interface';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {BehaviorSubject, forkJoin} from 'rxjs';

@Component({
    selector: 'app-master',
    templateUrl: './master.page.html',
    styleUrls: ['./master.page.scss'],
})
export class MasterPage extends Reinitable {

    public readonly submenu = MasterProfileSubmenu;
    public tab: BehaviorSubject<string> = new BehaviorSubject<string>(this.submenu.Info);
    public mainInfoSectionData: MainInfoSectionComponentInputDataInterface;

    constructor(
        private masterManager: MasterManagerService,
        private userManager: UserManagerService,
        private masterReviews: ReviewsApiService
    ) {
        super();
    }

    public selectTab(tab: string): void {
        this.tab.next(tab);
    }

    protected init(): void {
        this.initMainInfoSectionData();
    }

    private initMainInfoSectionData(): void {
        forkJoin({
            masterList: this.masterManager.getMasterList(),
            user: this.userManager.getCurrentUser(),
            reviews: this.masterReviews.get()
        }).subscribe(
            ({masterList, user, reviews}) => {
                this.mainInfoSectionData = {
                    fullName: `${(user as User).last_name} ${(user as User).first_name}`,
                    company: (masterList[0] as Master)?.company,
                    avatar: (user as User).avatar,
                    rating: (masterList[0] as Master)?.rating,
                    reviews: (reviews as ApiListResponseInterface<Review>).results,
                    is_confirmed: (user as User).is_confirmed
                };
            }
        );
    }
}
