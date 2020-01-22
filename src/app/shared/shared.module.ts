import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorFlashbagComponent} from '@app/shared/components/error-flashbag/error-flashbag.component';
import {MainGuard} from '@app/core/guards/main.guard';
import {TokenManagerService} from '@app/core/services/token-manager.service';



@NgModule({
  declarations: [
    ErrorFlashbagComponent
  ],
  exports: [
    ErrorFlashbagComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      MainGuard,
      TokenManagerService
  ]
})
export class SharedModule { }
