import { Component } from '@angular/core';
import { ProfessionalsApiCache, ServicesApiCache } from '@app/core/services/cache';

@Component({
  selector: 'app-inbox-page',
  templateUrl: './inbox-page.component.html',
  styleUrls: ['./inbox-page.component.scss'],
  providers: [ServicesApiCache, ProfessionalsApiCache],
})
export class InboxPageComponent {}
