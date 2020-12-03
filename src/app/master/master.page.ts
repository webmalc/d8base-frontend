import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PartialUserInterface} from '@app/core/interfaces/partial-user-interface';
import {Master} from '@app/core/models/master';
import {User} from '@app/core/models/user';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {MasterProfileSubmenu} from '@app/master/enums/master-profile-submenu';
import {MainInfoSectionComponentInputDataInterface} from '@app/master/interfaces/main-info-section-component-input-data-interface';
import {MasterReadonlyApiService} from '@app/master/services/master-readonly-api.service';
import {ReviewsReadonlyApiService} from '@app/master/services/reviews-readonly-api.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
        private readonly route: ActivatedRoute,
        private readonly masterReadonly: MasterReadonlyApiService
    ) {
        super();
    }

    public selectTab(tab: string): void {
        this.tab.next(tab);
    }

    protected init(): void {
        this.initMainInfoSectionData(this.route.snapshot.paramMap.get('master-id'));
        this.route.data.subscribe(data => this.editable.next(data.editable));
    }

    private initMainInfoSectionData(masterId: string): void {
        this.getUserMaster(masterId).subscribe(
            ({master, user}) => this.reviewsReadonly.get({professional: master.id.toString()}).subscribe(
                reviews => this.mainInfoSectionData = {
                    fullName: `${(user as User).last_name} ${(user as User).first_name}`,
                    company: master?.company,
                    avatar: user?.avatar,
                    rating: master?.rating,
                    reviews: reviews.results,
                    is_confirmed: user.is_confirmed
                }
            )
        );
    }

    private getUserMaster(masterId: string): Observable<{ user: PartialUserInterface, master: Master }> {
        return masterId === null ?
            forkJoin({
                master: this.masterManager.getMasterList().pipe(map(list => list[0])),
                user: this.userManager.getCurrentUser()
            }) :
            this.masterReadonly.getByEntityId(masterId).pipe(map(res => ({master: res, user: res.user})));
    }
}
