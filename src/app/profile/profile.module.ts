import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ProfilePageRoutingModule} from './profile-routing.module';

import {AboutEditComponent} from '@app/profile/components/about-edit/about-edit.component';
import {BookmarksItemComponent} from '@app/profile/components/bookmarks-tab/bookmarks-item/bookmarks-item.component';
import {BookmarksTabComponent} from '@app/profile/components/bookmarks-tab/bookmarks-tab.component';
import {ContactTabComponent} from '@app/profile/components/contact-tab/contact-tab.component';
import {MainInfoTabComponent} from '@app/profile/components/main-info-tab/main-info-tab.component';
import {ReviewsTabComponent} from '@app/profile/components/reviews-tab/reviews-tab.component';
import {SettingsTabComponent} from '@app/profile/components/settings-tab/settings-tab.component';
import {UserContactEditComponent} from '@app/profile/components/user-contact-edit/user-contact-edit.component';
import {UserEditComponent} from '@app/profile/components/user-edit/user-edit.component';
import {SettingsFormService} from '@app/profile/forms/settings-form.service';
import {BookmarksService} from '@app/profile/services/bookmarks.service';
import {PluginApiService} from '@app/profile/services/plugin-api.service';
import {ProfileService} from '@app/profile/services/profile.service';
import {RegisterEmailApiService} from '@app/profile/services/register-email-api.service';
import {SavedProfessionalApiService} from '@app/profile/services/saved-professional-api.service';
import {UserContactApiService} from '@app/profile/services/user-contact-api.service';
import {SharedModule} from '@app/shared/shared.module';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {TranslateModule} from '@ngx-translate/core';
import {IonicSelectableModule} from 'ionic-selectable';
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
        IonicSelectableModule
    ],
    declarations: [
        ProfilePage,
        MainInfoTabComponent,
        ContactTabComponent,
        SettingsTabComponent,
        BookmarksTabComponent,
        BookmarksItemComponent,
        ReviewsTabComponent,
        UserContactEditComponent,
        UserEditComponent,
        AboutEditComponent
    ],
    providers: [
        PluginApiService,
        ProfileService,
        UserContactApiService,
        SettingsFormService,
        BookmarksService,
        SavedProfessionalApiService,
        RegisterEmailApiService
    ]
})
export class ProfilePageModule {
}
