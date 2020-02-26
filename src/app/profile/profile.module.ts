import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ProfilePageRoutingModule} from './profile-routing.module';

import {UserPluginApiService} from '@app/profile/services/user-plugin-api.service';
import {SharedModule} from '@app/shared/shared.module';
import {ProfilePage} from './profile.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfilePageRoutingModule,
        SharedModule
    ],
    declarations: [ProfilePage]
})
export class ProfilePageModule {
}
