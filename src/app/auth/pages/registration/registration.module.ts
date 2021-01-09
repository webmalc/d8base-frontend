import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationPageRoutingModule } from './registration-routing.module';

import { CityPickerPopoverComponent } from '@app/auth/components/city-picker-popover/city-picker-popover.component';
import { RegistrationFormComponent } from '@app/auth/components/registration-form/registration-form.component';
import { RegistrationFormService } from '@app/auth/forms/registration-form.service';
import { RegistrationService } from '@app/auth/services/registration.service';
import { TokenManagerService } from '@app/core/services/token-manager.service';
import { SharedModule } from '@app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';
import { RegistrationPage } from './registration.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RegistrationPageRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        TranslateModule,
        IonicSelectableModule,
    ],
    declarations: [
        RegistrationPage,
        RegistrationFormComponent,
        CityPickerPopoverComponent,
    ],
    providers: [
        TokenManagerService,
        RegistrationFormService,
        RegistrationService,
    ],
})
export class RegistrationPageModule {
}
