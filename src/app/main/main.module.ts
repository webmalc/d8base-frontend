import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '@app/shared/shared.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {MainPageRoutingModule} from './main-routing.module';
import {MainPage} from './main.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MainPageRoutingModule,
        SharedModule,
        TranslateModule,
        FontAwesomeModule
    ],
    declarations: [MainPage]
})
export class MainPageModule {
}
