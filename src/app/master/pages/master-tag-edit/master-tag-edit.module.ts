import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TagsSelectInputComponent} from '@app/master/components/tags-select-input/tags-select-input.component';
import {MasterTabsPageModule} from '@app/master/pages/master-tabs/master-tabs.module';
import {SharedModule} from '@app/shared/shared.module';
import {IonicModule} from '@ionic/angular';
import {MasterTagEditPageRoutingModule} from './master-tag-edit-routing.module';
import {MasterTagEditPage} from './master-tag-edit.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MasterTagEditPageRoutingModule,
        ReactiveFormsModule,
        MasterTabsPageModule,
        SharedModule
    ],
    declarations: [MasterTagEditPage, TagsSelectInputComponent]
})
export class MasterTagEditPageModule {
}
