import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NgDestroyService } from '@app/core/services';
import { MasterProfileSubmenu } from '@app/professional/enums/master-profile-submenu';
import ProfessionalPageStateModel from '@app/store/professional-page/professional-page-state.model';
import ProfessionalPageSelectors from '@app/store/professional-page/professional-page.selectors';
import { Select } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-professional-page',
  templateUrl: './professional-page.component.html',
  styleUrls: ['./professional-page.component.scss'],
  providers: [NgDestroyService],
})
export class ProfessionalPage {
  public defaultTab: string = MasterProfileSubmenu.Info;
  public tab$: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultTab);
  public editable$: Observable<boolean>;
  public menu = MasterProfileSubmenu;

  @Select(ProfessionalPageSelectors.context)
  public context$: Observable<ProfessionalPageStateModel>;

  constructor(public readonly location: Location) {
    this.editable$ = this.context$.pipe(map(context => context?.canEdit));
  }

  public selectTab(tab: string): void {
    this.tab$.next(tab);
  }
}
