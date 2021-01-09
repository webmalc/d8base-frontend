import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryIconComponent } from '@app/main/components/category-icon/category-icon.component';
import { LocationPickerComponent } from '@app/main/components/location-picker/location-picker.component';
import { MainPageIconComponent } from '@app/main/components/main-page-icon/main-page-icon.component';
import { MainPageReviewComponent } from '@app/main/components/main-page-review/main-page-review.component';
import { OnMapPopoverComponent } from '@app/main/components/on-map-popover/on-map-popover.component';
import { DefaultCategoriesFactoryService } from '@app/main/services/default-categories-factory.service';
import { SharedModule } from '@app/shared/shared.module';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
    faCamera,
    faGraduationCap,
    faHome,
    faPaintRoller,
    faSpa,
    faStethoscope,
    faTableTennis,
    faUserTie,
    faVenusMars,
} from '@fortawesome/free-solid-svg-icons';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';
import { MainPageRoutingModule } from './main-routing.module';
import { MainPage } from './main.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MainPageRoutingModule,
        SharedModule,
        TranslateModule,
        FontAwesomeModule,
        IonicSelectableModule,
    ],
    declarations: [
        MainPage,
        CategoryIconComponent,
        MainPageIconComponent,
        MainPageReviewComponent,
        LocationPickerComponent,
        OnMapPopoverComponent,
    ],
    providers: [
        DefaultCategoriesFactoryService,
    ],
})
export class MainPageModule {
    constructor(lib: FaIconLibrary) {
        lib.addIcons(faGraduationCap, faStethoscope, faSpa, faVenusMars, faPaintRoller, faHome, faCamera, faUserTie, faTableTennis);
    }
}
