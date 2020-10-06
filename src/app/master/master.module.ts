import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MasterPageRoutingModule} from './master-routing.module';

import {MasterProfileCalendarComponent} from '@app/master/components/master-profile-calendar/master-profile-calendar.component';
import {MasterProfileFactoryComponent} from '@app/master/components/master-profile-factory/master-profile-factory.component';
import {MasterProfileInfoComponent} from '@app/master/components/master-profile-info/master-profile-info.component';
import {MasterProfileMainInfoSectionComponent} from '@app/master/components/master-profile-main-info-section/master-profile-main-info-section.component';
import {MasterProfilePortfolioComponent} from '@app/master/components/master-profile-portfolio/master-profile-portfolio.component';
import {MasterProfileServicesComponent} from '@app/master/components/master-profile-services/master-profile-services.component';
import {MasterTabsPageModule} from '@app/master/pages/master-tabs/master-tabs.module';
import {MasterReadonlyApiService} from '@app/master/services/master-readonly-api.service';
import {SharedModule} from '@app/shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {MasterPage} from './master.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MasterPageRoutingModule,
        MasterTabsPageModule,
        TranslateModule,
        SharedModule
    ],
    declarations: [
        MasterPage,
        MasterProfileFactoryComponent,
        MasterProfileInfoComponent,
        MasterProfileServicesComponent,
        MasterProfileCalendarComponent,
        MasterProfilePortfolioComponent,
        MasterProfileMainInfoSectionComponent
    ],
    providers: [
        MasterReadonlyApiService
    ]
})
export class MasterPageModule {
}
