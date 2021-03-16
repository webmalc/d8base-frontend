import { Component } from '@angular/core';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { DarkModeService } from '@app/core/services/dark-mode.service';
import { MasterManagerService } from '@app/core/services/master-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public isAuthenticated$: Observable<boolean>;
  public darkTheme$: Observable<boolean>;

  constructor(
    public readonly masterManager: MasterManagerService,
    authenticator: AuthenticationService,
    darkModeService: DarkModeService,
  ) {
    this.darkTheme$ = darkModeService.darkTheme$;
    this.isAuthenticated$ = authenticator.isAuthenticated$;
  }
}
