import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgDestroyService } from '@app/core/services';
import { MasterManagerService } from '@app/core/services/master-manager.service';
import { MasterProfileSubmenu } from '@app/master/enums/master-profile-submenu';
import { MainInfoSectionComponentInputDataInterface } from '@app/master/interfaces/main-info-section-component-input-data-interface';
import ProfessionalPageStateModel from '@app/store/professional-page/professional-page-state.model';
import * as ProfessionalPageActions from '@app/store/professional-page/professional-page.actions';
import ProfessionalPageSelectors from '@app/store/professional-page/professional-page.selectors';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-master',
  templateUrl: './master.page.html',
  styleUrls: ['./master.page.scss'],
  providers: [NgDestroyService],
})
export class MasterPage {
  public defaultTab: string = MasterProfileSubmenu.Info;
  public tab: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultTab);
  public mainInfoSectionData$: Observable<MainInfoSectionComponentInputDataInterface>;
  public editable$: Observable<boolean>;

  @Select(ProfessionalPageSelectors.context)
  public context$: Observable<ProfessionalPageStateModel>;

  constructor(
    public readonly location: Location,
    private readonly masterManager: MasterManagerService,
    private readonly route: ActivatedRoute,
    private readonly ngDestroy$: NgDestroyService,
  ) {
    this.route.paramMap
        .pipe(takeUntil(ngDestroy$))
        .subscribe(paramsMap => this.loadProfessionalById(paramsMap.get('master-id')));
    this.mainInfoSectionData$ = this.context$.pipe(
      first(context => Boolean(context?.user) && Boolean(context?.master)),
      map(({ user, master }) => ({
        fullName: master.name ?? `${user.last_name ?? ''} ${user.first_name ?? ''}`,
        company: master.company,
        avatar: user.avatar,
        rating: master.rating,
        is_confirmed: user.is_confirmed,
      })),
    );
    this.editable$ = this.context$.pipe(map(context => context?.canEdit));
  }

  public selectTab(tab: string): void {
    this.tab.next(tab);
  }

  @Dispatch()
  private loadProfessionalById(masterId: string): ProfessionalPageActions.LoadProfessionalById {
    return new ProfessionalPageActions.LoadProfessionalById(masterId);
  }
}
