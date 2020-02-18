import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MainGuard} from '@app/core/guards/main.guard';
import {TokenManagerService} from '@app/core/services/token-manager.service';
import {ErrorFlashbagComponent} from '@app/shared/components/error-flashbag/error-flashbag.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    ErrorFlashbagComponent
  ],
  exports: [
    ErrorFlashbagComponent
  ],
    imports: [
        CommonModule,
        TranslateModule
    ],
  providers: [
      MainGuard,
      TokenManagerService
  ]
})
export class SharedModule { }
