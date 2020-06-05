import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MainGuard} from '@app/core/guards/main.guard';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {ContactsTabComponent} from '@app/shared/components/contacts-tab/contacts-tab.component';
import {ErrorFlashbagComponent} from '@app/shared/components/error-flashbag/error-flashbag.component';
import {LocationItemComponent} from '@app/shared/components/location-item/location-item.component';
import {LocationListComponent} from '@app/shared/components/location/location-list.component';
import {PictureSelectorComponent} from '@app/shared/components/picture-selector/picture-selector.component';
import {ReviewsListComponent} from '@app/shared/components/reviews-list/reviews-list.component';
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
import {DebounceDirective} from './directives/debounce.directive';

@NgModule({
    declarations: [
        ErrorFlashbagComponent,
        PictureSelectorComponent,
        DebounceDirective,
        ContactsTabComponent,
        LocationListComponent,
        UserLocationMapComponent,
        LocationItemComponent,
        ReviewsListComponent
    ],
    exports: [
        ErrorFlashbagComponent,
        PictureSelectorComponent,
        DebounceDirective,
        ContactsTabComponent,
        LocationListComponent,
        LocationItemComponent,
        ReviewsListComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        IonicModule,
        ReactiveFormsModule,
        IonicSelectableModule,
        LeafletModule,
        FormsModule
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
