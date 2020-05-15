import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ContactsTabComponent} from '@app/master/components/contacts-tab/contacts-tab.component';
import {EditMasterComponent} from '@app/master/components/edit-master/edit-master.component';
import {LocationTabComponent} from '@app/master/components/location-tab/location-tab.component';
import {TagsSelectInputComponent} from '@app/master/components/tags-select-input/tags-select-input.component';
import {TagsTabComponent} from '@app/master/components/tags-tab/tags-tab.component';
import {EditMasterFormService} from '@app/master/forms/edit-master-form.service';
import {UserContactApiService} from '@app/profile/services/user-contact-api.service';
import {SharedModule} from '@app/shared/shared.module';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {MasterTabsPageRoutingModule} from './master-tabs-routing.module';
import {MasterTabsPage} from './master-tabs.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MasterTabsPageRoutingModule,
        TranslateModule,
        ReactiveFormsModule,
        SharedModule,

    ],
    declarations: [
        MasterTabsPage,
        EditMasterComponent,
        TagsTabComponent,
        TagsSelectInputComponent,
        ContactsTabComponent,
        LocationTabComponent
    ],
    providers: [EditMasterFormService, UserContactApiService]
})
export class MasterTabsPageModule {
}
