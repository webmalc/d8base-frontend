import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterManagerService } from '@app/core/services';
import { ServicesApiCache } from '@app/core/services/cache';
import { ProfessionalsApiCache } from '@app/core/services/cache/professionals-api-cache.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders-page',
  templateUrl: './my-orders-page.component.html',
  styleUrls: ['./my-orders-page.component.scss'],
  providers: [ServicesApiCache, ProfessionalsApiCache],
})
export class MyOrdersPageComponent {
  public state$: Observable<{ isMaster: boolean; isInbox: boolean }>;

  constructor(
    masterManager: MasterManagerService,
    route: ActivatedRoute,
  ) {
    this.state$ = combineLatest([
      masterManager.isMaster$,
      route.data,
    ]).pipe(
      map(([isMaster, data]) => ({ isMaster, isInbox: data.isInbox })),
    );
  }
}
