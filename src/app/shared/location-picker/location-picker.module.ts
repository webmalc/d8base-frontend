import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { LocationPickerComponent } from './location-picker.component';

@NgModule({
  declarations: [LocationPickerComponent],
  exports: [LocationPickerComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, TranslateModule, SharedModule],
})
export class LocationPickerModule {}
