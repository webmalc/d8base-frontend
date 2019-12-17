import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorFlashbagComponent} from './components/error-flashbag/error-flashbag.component';
import {MainGuard} from './guards/main.guard';
import {TokenManagerService} from '../core/auth/services/token-manager.service';



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
