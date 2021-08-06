import { Component } from '@angular/core';
import { ProfessionalList } from '@app/api/models';
import ProfessionalPageStateModel from '@app/store/professional-page/professional-page-state.model';
import ProfessionalPageSelectors from '@app/store/professional-page/professional-page.selectors';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-services-page',
  templateUrl: './service-list-page.component.html',
  styleUrls: ['./service-list-page.component.scss'],
})
export class ServiceListPageComponent {
  @Select(ProfessionalPageSelectors.context)
  public context$: Observable<ProfessionalPageStateModel>;
  public professional$: Observable<ProfessionalList>;

  constructor() {
    this.professional$ = this.context$.pipe(
      filter(x => !!x),
      map(context => context.professional),
    );
  }
}
