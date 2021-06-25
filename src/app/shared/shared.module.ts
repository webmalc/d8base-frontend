import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AddButtonComponent,
  CitySelectorComponent,
  ClientWidgetComponent,
  ColumnHeaderComponent,
  ContentWrapperComponent,
  CountryFlagComponent,
  CountrySelectorComponent,
  DateIntervalEditorComponent,
  DaySelectorComponent,
  DistrictSelectorComponent,
  DurationEditorComponent,
  DurationViewerComponent,
  FooterComponent,
  GenderSelectorComponent,
  HeaderComponent,
  HintComponent,
  ImageCarouselComponent,
  LanguageComponent,
  LoadingIndicatorComponent,
  LocationEditorPopoverComponent,
  LocationSelectorComponent,
  LocationViewerComponent,
  MainMenuComponent,
  MoreInfoComponent,
  NotFoundPageComponent,
  OrderDetailsComponent,
  PaymentMethodViewerComponent,
  PhoneEditorComponent,
  PhotoPopoverComponent,
  PriceComponent,
  PriceEditorComponent,
  ProfessionalCardComponent,
  RegionSelectorComponent,
  ScheduleEditorComponent,
  ScheduleViewerComponent,
  ServiceLocationComponent,
  ServiceTitleComponent,
  ServiceWidgetComponent,
  SubregionSelectorComponent,
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
import { HintDirective } from '@app/shared/directives';
import { ContactsTabFormService } from '@app/shared/forms/contacts-tab-form.service';
import {
  CountryByIdPipe,
  MasterByIdPipe,
  ServiceByIdPipe,
  ServiceDataFilterPipe,
  SubstringFilterPipe,
} from '@app/shared/pipes';
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
import { NewMessagesNotificationService } from '@app/shared/services/new-messages-notification.service';
import { IntervalService } from '@app/shared/services/interval.service';
import { FormControlErrorComponent } from './components/form-control-error/form-control-error.component';
import { ImageCropPopoverComponent } from './components/picture-selector/image-cropper/image-crop-popover.component';
import { SavedProfessionalToggleComponent } from './components/saved-professional-toggle/saved-professional-toggle.component';
import { ServicePhotosComponent } from './components/service-photos/service-photos.component';
import { DebounceDirective } from './directives/debounce.directive';
import { IonImageSpinnerDirective } from './directives/ion-image-spinner.directive';
import { IonImageViewSliderDirective } from './directives/ion-image-view-slider.directive';
import { IonImageViewDirective } from './directives/ion-image-view.directive';
import { NumberDirective } from './directives/number.directive';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { ContactsEditComponent } from './components/contacts-edit/contacts-edit.component';
import { ChatButtonComponent } from './components/chat-button/chat-button.component';
import { LoadingErrorComponent } from './components/loading-error/loading-error.component';
import { IfSpinnerModule } from './if-spinner/if-spinner.module';
import { IF_SPINNER_MODULE_CONFIG_TOKEN } from './if-spinner/if-spinner.config';
import { HintPopoverComponent } from './components/hint-popover/hint-popover.component';

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
    LoadingErrorComponent,
    PaymentMethodViewerComponent,
    PaymentMethodEditorComponent,
    PriceEditorComponent,
    LocationSelectorComponent,
    IonImageViewSliderDirective,
    GenderSelectorComponent,
    ServiceTitleComponent,
    ColumnHeaderComponent,
    DateIntervalEditorComponent,
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
    LocationEditorPopoverComponent,
    ChatButtonComponent,
    SubstringFilterPipe,
    HintDirective,
    HintComponent,
    HintPopoverComponent,
  ],
  exports: [
    IfSpinnerModule,
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
    LoadingErrorComponent,
    PaymentMethodViewerComponent,
    PaymentMethodEditorComponent,
    PriceEditorComponent,
    LocationSelectorComponent,
    IonImageViewSliderDirective,
    GenderSelectorComponent,
    ServiceTitleComponent,
    ColumnHeaderComponent,
    DateIntervalEditorComponent,
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
    LocationEditorPopoverComponent,
    ChatButtonComponent,
    SubstringFilterPipe,
    HintDirective,
    HintComponent,
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
    IfSpinnerModule,
  ],
  providers: [
    // TODO Create core module and move providers into it
    ContactsTabFormService,
    SelectableCityOnSearchService,
    SelectableCountryOnSearchService,
    SelectableDistrictOnSearchService,
    SelectableRegionOnSearchService,
    SelectableSubregionOnSearchService,
    NewMessagesNotificationService,
    IntervalService,
    {
      provide: IF_SPINNER_MODULE_CONFIG_TOKEN,
      useValue: {
        errorComponent: LoadingErrorComponent,
        loadingComponent: LoadingIndicatorComponent,
      },
    },
  ],
})
export class SharedModule {}
