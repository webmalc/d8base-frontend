import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MainGuard} from '@app/core/guards/main.guard';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {
    DurationComponent,
    FooterComponent,
    HeaderComponent,
    MainMenuComponent,
    MasterWidgetComponent,
    MoreInfoComponent,
    ServiceWidgetComponent,
    WizardProgressComponent
} from '@app/shared/components';
import {AbstractContactsComponent} from '@app/shared/components/abstract-contacts/abstract-contacts.component';
import {AbstractLocationEditComponent} from '@app/shared/components/abstract-location-edit/abstract-location-edit.component';
import {CollapseItemComponent} from '@app/shared/components/collapse-item/collapse-item.component';
import {ContactsTabComponent} from '@app/shared/components/contacts-tab/contacts-tab.component';
import {DefaultLocationPopoverComponent} from '@app/shared/components/default-location-popover/default-location-popover.component';
import {ErrorFlashbagComponent} from '@app/shared/components/error-flashbag/error-flashbag.component';
import {InfoRowComponent} from '@app/shared/components/info-row/info-row.component';
import {MainMenuFooterToolbarComponent} from '@app/shared/components/main-menu/main-menu-footer-toolbar/main-menu-footer-toolbar.component';
import {MediaLinksComponent} from '@app/shared/components/media-links/media-links.component';
import {PictureSelectorComponent} from '@app/shared/components/picture-selector/picture-selector.component';
import {RatingFullStarComponent} from '@app/shared/components/rating-full-star/rating-full-star.component';
import {RatingHalfStarComponent} from '@app/shared/components/rating-half-star/rating-half-star.component';
import {RatingComponent} from '@app/shared/components/rating/rating.component';
import {ReviewsListComponent} from '@app/shared/components/reviews-list/reviews-list.component';
import {ServicePublishAgreementComponent} from '@app/shared/components/service-publish-agreement/service-publish-agreement.component';
import {UserLocationMapComponent} from '@app/shared/components/user-location-map/user-location-map.component';
import {ContactsTabFormService} from '@app/shared/forms/contacts-tab-form.service';
import {SelectableCityOnSearchService} from '@app/shared/services/selectable-city-on-search.service';
import {SelectableCountryOnSearchService} from '@app/shared/services/selectable-country-on-search.service';
import {SelectableDistrictOnSearchService} from '@app/shared/services/selectable-district-on-search.service';
import {SelectableRegionOnSearchService} from '@app/shared/services/selectable-region-on-search.service';
import {SelectableSubregionOnSearchService} from '@app/shared/services/selectable-subregion-on-search.service';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {IonicSelectableModule} from 'ionic-selectable';
import {ImageCropperModule} from 'ngx-image-cropper';
import {ContactsAddComponent} from './components/contacts-add/contacts-add.component';
import {ImageCropPopoverComponent} from './components/picture-selector/image-cropper/image-crop-popover.component';
import {DebounceDirective} from './directives/debounce.directive';
import {NumberDirective} from './directives/number.directive';

@NgModule({
    declarations: [
        ErrorFlashbagComponent,
        PictureSelectorComponent,
        DebounceDirective,
        ContactsTabComponent,
        UserLocationMapComponent,
        ReviewsListComponent,
        MediaLinksComponent,
        HeaderComponent,
        FooterComponent,
        MainMenuComponent,
        CollapseItemComponent,
        InfoRowComponent,
        NumberDirective,
        ContactsAddComponent,
        ServicePublishAgreementComponent,
        AbstractContactsComponent,
        AbstractLocationEditComponent,
        RatingComponent,
        RatingFullStarComponent,
        RatingHalfStarComponent,
        DurationComponent,
        ImageCropPopoverComponent,
        ServiceWidgetComponent,
        WizardProgressComponent,
        MainMenuFooterToolbarComponent,
        DefaultLocationPopoverComponent,
        MoreInfoComponent,
        MasterWidgetComponent
    ],
    exports: [
        ErrorFlashbagComponent,
        PictureSelectorComponent,
        DebounceDirective,
        ContactsTabComponent,
        ReviewsListComponent,
        MediaLinksComponent,
        HeaderComponent,
        FooterComponent,
        MainMenuComponent,
        CollapseItemComponent,
        UserLocationMapComponent,
        InfoRowComponent,
        NumberDirective,
        ContactsAddComponent,
        ServicePublishAgreementComponent,
        AbstractContactsComponent,
        AbstractLocationEditComponent,
        RatingComponent,
        RatingFullStarComponent,
        RatingHalfStarComponent,
        DurationComponent,
        ServiceWidgetComponent,
        WizardProgressComponent,
        DefaultLocationPopoverComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        IonicModule,
        ReactiveFormsModule,
        IonicSelectableModule,
        LeafletModule,
        FormsModule,
        RouterModule,
        ImageCropperModule
    ],
    providers: [
        MainGuard,
        TokenManagerService,
        ContactsTabFormService,
        SelectableCityOnSearchService,
        SelectableCountryOnSearchService,
        SelectableDistrictOnSearchService,
        SelectableRegionOnSearchService,
        SelectableSubregionOnSearchService
    ]
})
export class SharedModule {
}
