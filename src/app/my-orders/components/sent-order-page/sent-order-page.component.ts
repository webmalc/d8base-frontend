import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile, SentOrder } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { toNumber } from '@app/core/functions/string.functions';
import { ProfessionalsApiCache, ServicesApiCache } from '@app/core/services/cache';
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

  constructor(route: ActivatedRoute, api: AccountsService) {
    this.order$ = route.params.pipe(
      map(params => toNumber(params.id)),
      switchMap(id => (id ? api.accountsOrdersSentRead(id) : of<SentOrder>())),
    );
  }

  public showMoreInfo(): void {
    // TODO show additional information
  }
}
