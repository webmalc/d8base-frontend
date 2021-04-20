import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AccountsService } from '@app/api/services';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register-verify',
  templateUrl: './register-verify.page.html',
  styleUrls: ['./register-verify.page.scss'],
})
export class RegisterVerifyPage implements OnInit {
  public success: boolean = false;

  constructor(private readonly activatedRoute: ActivatedRoute, private readonly accountsService: AccountsService) {}

  public ngOnInit(): void {
    this.checkRegistrationIsVerified();
  }

  private checkRegistrationIsVerified(): void {
    this.activatedRoute.queryParams
      .pipe(
        switchMap((params: Params) =>
          this.accountsService.accountsVerifyRegistrationCreate({
            user_id: params.user_id,
            timestamp: params.timestamp,
            signature: params.signature,
          }),
        ),
      )
      .subscribe(() => {
        this.success = true;
      });
  }
}
