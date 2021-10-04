import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';

import { OnMapPopoverComponent } from './on-map-popover/on-map-popover.component';
import { LocationPickerComponent } from './location-picker/location-picker.component';
import { CitySelectorComponent } from './city-selector/city-selector.component';
import { CountrySelectorComponent } from './country-selector/country-selector.component';
import { DistrictSelectorComponent } from './district-selector/district-selector.component';
import { LocationEditorPopoverComponent } from './location-editor-popover/location-editor-popover.component';
import { LocationEditorComponent } from './location-editor.component';
import { LocationSelectorComponent } from './location-selector/location-selector.component';
import { PostalCodeSelectorComponent } from './postal-code-selector/postal-code-selector.component';
import { RegionSelectorComponent } from './region-selector/region-selector.component';
import { ServiceLocationEditorComponent } from './service-location-editor/service-location-editor.component';
import { SubregionSelectorComponent } from './subregion-selector/subregion-selector.component';

@NgModule({
  declarations: [
    CitySelectorComponent,
    CountrySelectorComponent,
    DistrictSelectorComponent,
    PostalCodeSelectorComponent,
    RegionSelectorComponent,
    SubregionSelectorComponent,
    LocationEditorComponent,
    LocationEditorPopoverComponent,
    LocationSelectorComponent,
    ServiceLocationEditorComponent,
    LocationPickerComponent,
    OnMapPopoverComponent,
  ],
  exports: [
    LocationEditorComponent,
    LocationEditorPopoverComponent,
    LocationSelectorComponent,
    ServiceLocationEditorComponent,
    LocationPickerComponent,
    OnMapPopoverComponent,
    CitySelectorComponent,
    CountrySelectorComponent,
    PostalCodeSelectorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    SharedModule,
    IonicSelectableModule,
  ],
})
export class LocationEditorModule {}
