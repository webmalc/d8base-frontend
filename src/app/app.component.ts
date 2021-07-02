import { Component } from '@angular/core';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { DarkModeService } from '@app/core/services/dark-mode.service';
import { MasterManagerService } from '@app/core/services/master-manager.service';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import LoaderSelectors from './store/loader/loader.selectors';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @Select(LoaderSelectors.isLoaderShown)
  public isLoaderShown$: Observable<boolean>;
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
