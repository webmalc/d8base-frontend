import { Component } from '@angular/core';
import { ProfessionalsApiCache, ServicesApiCache } from '@app/core/services/cache';

@Component({
  selector: 'app-outbox-page',
  templateUrl: './outbox-page.component.html',
  styleUrls: ['./outbox-page.component.scss'],
  providers: [ServicesApiCache, ProfessionalsApiCache],
})
export class OutboxPageComponent {}
