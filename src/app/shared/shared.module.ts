import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MainGuard} from '@app/core/guards/main.guard';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {ErrorFlashbagComponent} from '@app/shared/components/error-flashbag/error-flashbag.component';
import {TranslateModule} from '@ngx-translate/core';
import {PictureSelectorComponent} from '@app/shared/components/picture-selector/picture-selector.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
    declarations: [
        ErrorFlashbagComponent,
        PictureSelectorComponent
    ],
    exports: [
        ErrorFlashbagComponent,
        PictureSelectorComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        IonicModule
    ],
  providers: [
      MainGuard,
      TokenManagerService
  ]
})
export class SharedModule { }
