import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TokenManagerService} from '@app/auth/services/token-manager.service';
import {ErrorFlashbagComponent} from '@app/shared/components/error-flashbag/error-flashbag.component';
import {MainGuard} from '@app/core/guards/main.guard';



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
