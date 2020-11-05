import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CategoryIconComponent} from '@app/main/components/category-icon/category-icon.component';
import {MainPageIconComponent} from '@app/main/components/main-page-icon/main-page-icon.component';
import {MainPageReviewComponent} from '@app/main/components/main-page-review/main-page-review.component';
import {SharedModule} from '@app/shared/shared.module';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {
    faCamera,
    faGraduationCap,
    faHome,
    faPaintRoller,
    faSpa,
    faStethoscope, faTableTennis,
    faUserTie,
    faVenusMars
} from '@fortawesome/free-solid-svg-icons';
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
    declarations: [
        MainPage,
        CategoryIconComponent,
        MainPageIconComponent,
        MainPageReviewComponent
    ]
})
export class MainPageModule {
    constructor(lib: FaIconLibrary) {
        lib.addIcons(faGraduationCap, faStethoscope, faSpa, faVenusMars, faPaintRoller, faHome, faCamera, faUserTie, faTableTennis);
    }

}
