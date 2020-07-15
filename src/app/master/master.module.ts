import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MasterPageRoutingModule} from './master-routing.module';

import {MasterTabsPageModule} from '@app/master/pages/master-tabs/master-tabs.module';
import {MasterPage} from './master.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MasterPageRoutingModule,
        MasterTabsPageModule
    ],
    declarations: [MasterPage]
})
export class MasterPageModule {
}
