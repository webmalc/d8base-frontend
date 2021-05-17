import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '@app/api/models';
import { SentOrder } from '@app/core/models/sent-order';
import { ProfessionalsApiCache, ServicesApiCache } from '@app/core/services/cache';
import { SentOrdersApiService } from '@app/order/services';
import CurrentUserSelectors from '@app/store/current-user/current-user.selectors';
import { Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-sent-order-page',
  templateUrl: './sent-order-page.component.html',
  styleUrls: ['./sent-order-page.component.scss'],
  providers: [ServicesApiCache, ProfessionalsApiCache],
})
export class SentOrderPageComponent {
  @Select(CurrentUserSelectors.userId)
  public userId$: Observable<Profile['id']>;

  public order$: Observable<SentOrder>;

  constructor(route: ActivatedRoute, sentOrdersApi: SentOrdersApiService) {
    this.order$ = route.params.pipe(
      map(params => Number.parseInt(params.id, 10)),
      switchMap(id => id ? sentOrdersApi.getByEntityId(id) : of<SentOrder>()),
    );
  }
}
