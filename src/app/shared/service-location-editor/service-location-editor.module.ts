import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ServiceLocationEditorComponent } from './service-location-editor.component';

@NgModule({
  declarations: [ServiceLocationEditorComponent],
  exports: [ServiceLocationEditorComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, TranslateModule, SharedModule],
})
export class ServiceLocationEditorModule {}
