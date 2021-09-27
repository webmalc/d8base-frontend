import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryIconWrapperComponent } from '@app/main/components/category-icon-wrapper/category-icon-wrapper.component';
import { CategoryIconComponent } from '@app/main/components/category-icon/category-icon.component';
import { DefaultCategoriesFactoryService } from '@app/main/services/default-categories-factory.service';
import { LocationPickerModule } from '@app/shared/location-picker';
import { SharedModule } from '@app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';
import { IntroductionComponent } from './components/introduction/introduction.component';
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
  declarations: [MainPage, CategoryIconComponent, CategoryIconWrapperComponent, IntroductionComponent],
  providers: [DefaultCategoriesFactoryService],
})
export class MainPageModule {}
