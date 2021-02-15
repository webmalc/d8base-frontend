import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultRegisterUser, UserLocation } from '@app/api/models';
import { RegistrationService } from '@app/auth/services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {

  public errorMessages: string[];

  constructor(private readonly registrationService: RegistrationService, private readonly router: Router) {
  }

  public onSubmitRegistrationForm(data: { user: DefaultRegisterUser; location: UserLocation }): void {
    this.errorMessages = null;
    this.registrationService.register(data.user, { location: data.location });
    this.router.navigateByUrl('/profile');
  }
}
