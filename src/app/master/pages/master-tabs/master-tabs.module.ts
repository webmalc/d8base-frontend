import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MasterTabsPageRoutingModule} from './master-tabs-routing.module';

import {EditMasterComponent} from '@app/master/components/edit-master/edit-master.component';
import {TagsSelectInputComponent} from '@app/master/components/tags-select-input/tags-select-input.component';
import {TagsTabComponent} from '@app/master/components/tags-tab/tags-tab.component';
import {EditMasterFormService} from '@app/master/forms/edit-master-form.service';
import {SharedModule} from '@app/shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
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
    declarations: [MasterTabsPage, EditMasterComponent, TagsTabComponent, TagsSelectInputComponent],
    providers: [EditMasterFormService]
})
export class MasterTabsPageModule {
}
