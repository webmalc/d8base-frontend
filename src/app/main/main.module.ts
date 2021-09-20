import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryIconComponent } from '@app/main/components/category-icon/category-icon.component';
import { CategoryIconWrapperComponent } from '@app/main/components/main-page-icon/category-icon-wrapper.component';
import { DefaultCategoriesFactoryService } from '@app/main/services/default-categories-factory.service';
import { LocationPickerModule } from '@app/shared/location-picker';
import { SharedModule } from '@app/shared/shared.module';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBriefcase,
  faCamera,
  faGraduationCap,
  faHome,
  faPaintRoller,
  faSpa,
  faStethoscope,
  faTools,
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
    ReactiveFormsModule,
    LocationPickerModule,
  ],
  declarations: [MainPage, CategoryIconComponent, CategoryIconWrapperComponent],
  providers: [DefaultCategoriesFactoryService],
})
export class MainPageModule {
  constructor(lib: FaIconLibrary) {
    lib.addIcons(
      faGraduationCap,
      faStethoscope,
      faSpa,
      faVenusMars,
      faPaintRoller,
      faHome,
      faCamera,
      faUserTie,
      faBriefcase,
      faTools,
    );
  }
}
