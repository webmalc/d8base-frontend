import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgDestroyService } from '@app/core/services';
import { MasterManagerService } from '@app/core/services/master-manager.service';
import { MasterProfileSubmenu } from '@app/master/enums/master-profile-submenu';
import ProfessionalPageStateModel from '@app/store/professional-page/professional-page-state.model';
import * as ProfessionalPageActions from '@app/store/professional-page/professional-page.actions';
import ProfessionalPageSelectors from '@app/store/professional-page/professional-page.selectors';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-master',
  templateUrl: './master.page.html',
  styleUrls: ['./master.page.scss'],
  providers: [NgDestroyService],
})
export class MasterPage {
  public defaultTab: string = MasterProfileSubmenu.Info;
  public tab: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultTab);
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
