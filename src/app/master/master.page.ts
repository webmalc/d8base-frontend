import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfessionalList, UserExtended} from '@app/api/models';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {UserManagerService} from '@app/core/services/user-manager.service';
import {MasterProfileSubmenu} from '@app/master/enums/master-profile-submenu';
import {MainInfoSectionComponentInputDataInterface} from '@app/master/interfaces/main-info-section-component-input-data-interface';
import MasterProfileContext from '@app/master/interfaces/master-profile-context.interface';
import {MasterProfileContextService} from '@app/master/services/master-profile-context.service';
import {MasterReadonlyApiService} from '@app/master/services/master-readonly-api.service';
import {ReviewsReadonlyApiService} from '@app/master/services/reviews-readonly-api.service';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import {first, map, switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-master',
    templateUrl: './master.page.html',
    styleUrls: ['./master.page.scss'],
    providers: [MasterProfileContextService],
})
export class MasterPage {

    public defaultTab: string = MasterProfileSubmenu.Info;
    public tab: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultTab);
    public mainInfoSectionData$: Observable<MainInfoSectionComponentInputDataInterface>;
    public editable$: Observable<boolean>;

    constructor(
        public readonly location: Location,
        private readonly masterManager: MasterManagerService,
        private readonly userManager: UserManagerService,
        private readonly reviewsReadonly: ReviewsReadonlyApiService,
        private readonly route: ActivatedRoute,
        private readonly masterReadonly: MasterReadonlyApiService,
        contextService: MasterProfileContextService,
    ) {
        this.createContext().subscribe(context => contextService.setContext(context));
        this.mainInfoSectionData$ = contextService.context$.pipe(
            first(({user, master}) => Boolean(user) && Boolean(master)),
            map(({user, master}) => ({
                fullName: master.name ?? `${user.last_name ?? ''} ${user.first_name ?? ''}`,
                company: master.company,
                avatar: user.avatar,
                rating: master.rating,
                reviews: [],
                is_confirmed: user.is_confirmed,
            })));
        this.editable$ = contextService.context$.pipe(map(context => context?.canEdit));
    }

    public selectTab(tab: string): void {
        this.tab.next(tab);
    }

    private getUserMaster(masterId: number): Observable<{ user: UserExtended, master: ProfessionalList }> {
        return Number.isNaN(masterId) ?
            forkJoin({
                master: this.masterManager.getMasterList().pipe(
                    map(list => list[0]),
                    switchMap(master => this.masterReadonly.getByEntityId(master.id)),
                ),
                user: this.userManager.getCurrentUser(),
            }) :
            this.masterReadonly.getByEntityId(masterId).pipe(map(res => ({master: res, user: res.user})));
    }

    private createContext(): Observable<MasterProfileContext> {
        const masterId = Number.parseInt(this.route.snapshot.paramMap.get('master-id'), 10);

        return this.getUserMaster(masterId).pipe(
            map(({user, master}) => ({user, master, canEdit: Number.isNaN(masterId)})),
        );
    }
}
