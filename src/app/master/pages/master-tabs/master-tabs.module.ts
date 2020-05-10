import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ContactsTabComponent} from '@app/master/components/contacts-tab/contacts-tab.component';
import {EditMasterComponent} from '@app/master/components/edit-master/edit-master.component';
import {TagsSelectInputComponent} from '@app/master/components/tags-select-input/tags-select-input.component';
import {TagsTabComponent} from '@app/master/components/tags-tab/tags-tab.component';
import {EditMasterFormService} from '@app/master/forms/edit-master-form.service';
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
        SharedModule
    ],
    declarations: [
        MasterTabsPage,
        EditMasterComponent,
        TagsTabComponent,
        TagsSelectInputComponent,
        ContactsTabComponent
    ],
    providers: [EditMasterFormService]
})
export class MasterTabsPageModule {
}
