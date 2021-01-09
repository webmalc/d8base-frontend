import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AboutEditComponent} from '@app/profile/components/about-edit/about-edit.component';
import {UserEditComponent} from '@app/profile/components/user-edit/user-edit.component';
import {SettingsFormService} from '@app/profile/forms/settings-form.service';
import {BookmarksService} from '@app/profile/services/bookmarks.service';
import {PluginApiService} from '@app/profile/services/plugin-api.service';
import {ProfileService} from '@app/profile/services/profile.service';
import {RegisterEmailApiService} from '@app/profile/services/register-email-api.service';
import {SavedProfessionalApiService} from '@app/profile/services/saved-professional-api.service';
import {UserContactApiService} from '@app/profile/services/user-contact-api.service';
import {UserContactEditComponent} from '@app/shared/components/user-contact-edit/user-contact-edit.component';
import {SharedModule} from '@app/shared/shared.module';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {IonicSelectableModule} from 'ionic-selectable';
import {ProfilePageRoutingModule} from './profile-routing.module';
import {ProfilePage} from './profile.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfilePageRoutingModule,
        TranslateModule,
        ReactiveFormsModule,
        SharedModule,
        LeafletModule,
        IonicSelectableModule,
    ],
    declarations: [
        ProfilePage,
        UserContactEditComponent,
        UserEditComponent,
        AboutEditComponent,
    ],
    providers: [
        PluginApiService,
        ProfileService,
        UserContactApiService,
        SettingsFormService,
        BookmarksService,
        SavedProfessionalApiService,
        RegisterEmailApiService,
    ],
})
export class ProfilePageModule {
}
