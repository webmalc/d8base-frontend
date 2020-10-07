import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ExperienceEditComponent} from '@app/master/components/experience-edit/experience-edit.component';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {MasterExperienceEditPageRoutingModule} from './master-experience-edit-routing.module';
import {MasterExperienceEditPage} from './master-experience-edit.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MasterExperienceEditPageRoutingModule,
        TranslateModule
    ],
    declarations: [
        MasterExperienceEditPage,
        ExperienceEditComponent
    ]
})
export class MasterExperienceEditPageModule {
}
