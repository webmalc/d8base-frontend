import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MainGuard } from '@app/core/guards/main.guard';
import {
  AddButtonComponent,
  ClientWidgetComponent,
  ColumnHeaderComponent,
  ContentWrapperComponent,
  DateIntervalEditorComponent,
  DaySelectorComponent,
  DurationEditorComponent,
  DurationViewerComponent,
  FooterComponent,
  GenderSelectorComponent,
  HeaderComponent,
  LoadingIndicatorComponent,
  LocationSelectorComponent,
  LocationViewerComponent,
  MainMenuComponent,
  MoreInfoComponent,
  NotFoundPageComponent,
  OrderDetailsComponent,
  PaymentMethodViewerComponent,
  PhotoPopoverComponent,
  PriceComponent,
  PriceEditorComponent,
  ProfessionalCardComponent,
  ScheduleEditorComponent,
  ScheduleViewerComponent,
  ServiceLocationComponent,
  ServiceTitleComponent,
  ServiceWidgetComponent,
  LanguageComponent,
  CountrySelectorComponent,
  CitySelectorComponent,
  RegionSelectorComponent,
  SubregionSelectorComponent,
  DistrictSelectorComponent,
  PhoneEditorComponent,
  ImageCarouselComponent,
  CountryFlagComponent,
} from '@app/shared/components';
import { ContactsViewComponent } from '@app/shared/components/contacts-view/contacts-view.component';
import { LocationEditorComponent } from '@app/shared/components/location-editor/location-editor.component';
import { CalendarComponentComponent } from '@app/shared/components/calendar-component/calendar-component.component';
import { CollapseItemComponent } from '@app/shared/components/collapse-item/collapse-item.component';
import { DefaultLocationPopoverComponent } from '@app/shared/components/default-location-popover/default-location-popover.component';
import { ErrorFlashbagComponent } from '@app/shared/components/error-flashbag/error-flashbag.component';
import { FlagMenuComponent } from '@app/shared/components/flag-menu/flag-menu.component';
import { InfoRowComponent } from '@app/shared/components/info-row/info-row.component';
import { MediaLinksComponent } from '@app/shared/components/media-links/media-links.component';
import { PaymentMethodEditorComponent } from '@app/shared/components/payment-method-editor/payment-method-editor.component';
import { PictureSelectorComponent } from '@app/shared/components/picture-selector/picture-selector.component';
import { RatingFullStarComponent } from '@app/shared/components/rating-full-star/rating-full-star.component';
import { RatingHalfStarComponent } from '@app/shared/components/rating-half-star/rating-half-star.component';
import { RatingComponent } from '@app/shared/components/rating/rating.component';
import { ServicePublishAgreementComponent } from '@app/shared/components/service-publish-agreement/service-publish-agreement.component';
import { SuccessFlashbagComponent } from '@app/shared/components/success-flashbag/success-flashbag.component';
import { UserLocationMapComponent } from '@app/shared/components/user-location-map/user-location-map.component';
import { ContactsTabFormService } from '@app/shared/forms/contacts-tab-form.service';
import { CountryByIdPipe, MasterByIdPipe, ServiceByIdPipe, ServiceDataFilterPipe } from '@app/shared/pipes';
import { SelectableCityOnSearchService } from '@app/shared/services/selectable-city-on-search.service';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import { SelectableDistrictOnSearchService } from '@app/shared/services/selectable-district-on-search.service';
import { SelectableRegionOnSearchService } from '@app/shared/services/selectable-region-on-search.service';
import { SelectableSubregionOnSearchService } from '@app/shared/services/selectable-subregion-on-search.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormControlErrorComponent } from './components/form-control-error/form-control-error.component';
import { ImageCropPopoverComponent } from './components/picture-selector/image-cropper/image-crop-popover.component';
import { SavedProfessionalToggleComponent } from './components/saved-professional-toggle/saved-professional-toggle.component';
import { ServicePhotosComponent } from './components/service-photos/service-photos.component';
import { DebounceDirective } from './directives/debounce.directive';
import { IfSpinnerDirective } from './directives/if-spinner.directive';
import { IonImageSpinnerDirective } from './directives/ion-image-spinner.directive';
import { IonImageViewSliderDirective } from './directives/ion-image-view-slider.directive';
import { IonImageViewDirective } from './directives/ion-image-view.directive';
import { NumberDirective } from './directives/number.directive';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { ContactsEditComponent } from './components/contacts-edit/contacts-edit.component';

@NgModule({
  declarations: [
    AddButtonComponent,
    ErrorFlashbagComponent,
    PictureSelectorComponent,
    DebounceDirective,
    UserLocationMapComponent,
    MediaLinksComponent,
    HeaderComponent,
    FooterComponent,
    MainMenuComponent,
    CollapseItemComponent,
    InfoRowComponent,
    NumberDirective,
    ServicePublishAgreementComponent,
    ContactsViewComponent,
    LocationEditorComponent,
    RatingComponent,
    RatingFullStarComponent,
    RatingHalfStarComponent,
    DurationEditorComponent,
    ImageCropPopoverComponent,
    ServiceWidgetComponent,
    DefaultLocationPopoverComponent,
    MoreInfoComponent,
    ProfessionalCardComponent,
    DefaultLocationPopoverComponent,
    FlagMenuComponent,
    CalendarComponentComponent,
    OrderDetailsComponent,
    ClientWidgetComponent,
    ServiceByIdPipe,
    MasterByIdPipe,
    ScheduleEditorComponent,
    DaySelectorComponent,
    PriceComponent,
    ServiceDataFilterPipe,
    ScheduleViewerComponent,
    DurationViewerComponent,
    FormControlErrorComponent,
    SuccessFlashbagComponent,
    ServicePhotosComponent,
    PhotoPopoverComponent,
    IonImageSpinnerDirective,
    IonImageViewDirective,
    LocationViewerComponent,
    ContentWrapperComponent,
    ServiceLocationComponent,
    LoadingIndicatorComponent,
    PaymentMethodViewerComponent,
    PaymentMethodEditorComponent,
    PriceEditorComponent,
    LocationSelectorComponent,
    IonImageViewSliderDirective,
    GenderSelectorComponent,
    ServiceTitleComponent,
    ColumnHeaderComponent,
    DateIntervalEditorComponent,
    IfSpinnerDirective,
    CountryByIdPipe,
    NotFoundPageComponent,
    LanguageComponent,
    SavedProfessionalToggleComponent,
    CountrySelectorComponent,
    CitySelectorComponent,
    RegionSelectorComponent,
    SubregionSelectorComponent,
    DistrictSelectorComponent,
    PhoneEditorComponent,
    ImageCarouselComponent,
    CountryFlagComponent,
    ContactEditComponent,
    ContactsEditComponent,
  ],
  exports: [
    AddButtonComponent,
    ErrorFlashbagComponent,
    PictureSelectorComponent,
    DebounceDirective,
    MediaLinksComponent,
    HeaderComponent,
    FooterComponent,
    MainMenuComponent,
    CollapseItemComponent,
    UserLocationMapComponent,
    InfoRowComponent,
    NumberDirective,
    ServicePublishAgreementComponent,
    ContactsViewComponent,
    LocationEditorComponent,
    RatingComponent,
    RatingFullStarComponent,
    RatingHalfStarComponent,
    DurationEditorComponent,
    ServiceWidgetComponent,
    DefaultLocationPopoverComponent,
    FlagMenuComponent,
    CalendarComponentComponent,
    OrderDetailsComponent,
    ClientWidgetComponent,
    ProfessionalCardComponent,
    ServiceByIdPipe,
    MasterByIdPipe,
    ScheduleEditorComponent,
    PriceComponent,
    ServiceDataFilterPipe,
    ScheduleViewerComponent,
    DurationViewerComponent,
    FormControlErrorComponent,
    SuccessFlashbagComponent,
    ServicePhotosComponent,
    PhotoPopoverComponent,
    IonImageSpinnerDirective,
    IonImageViewDirective,
    LocationViewerComponent,
    ContentWrapperComponent,
    ServiceLocationComponent,
    LoadingIndicatorComponent,
    PaymentMethodViewerComponent,
    PaymentMethodEditorComponent,
    PriceEditorComponent,
    LocationSelectorComponent,
    IonImageViewSliderDirective,
    GenderSelectorComponent,
    ServiceTitleComponent,
    ColumnHeaderComponent,
    DateIntervalEditorComponent,
    IfSpinnerDirective,
    CountryByIdPipe,
    NotFoundPageComponent,
    LanguageComponent,
    SavedProfessionalToggleComponent,
    CountrySelectorComponent,
    CitySelectorComponent,
    PhoneEditorComponent,
    ImageCarouselComponent,
    CountryFlagComponent,
    ContactEditComponent,
    ContactsEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    IonicSelectableModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    LeafletModule,
    ImageCropperModule,
  ],
  providers: [
    // TODO Create core module and move providers into it
    MainGuard,
    ContactsTabFormService,
    SelectableCityOnSearchService,
    SelectableCountryOnSearchService,
    SelectableDistrictOnSearchService,
    SelectableRegionOnSearchService,
    SelectableSubregionOnSearchService,
  ],
})
export class SharedModule {}
