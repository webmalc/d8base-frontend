import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IfSpinnerDirective } from './directives/if-spinner.directive';
import { IfSpinnerErrorStatePipe } from './pipes/if-spinner-state.pipe';

@NgModule({
  declarations: [IfSpinnerErrorStatePipe, IfSpinnerDirective],
  imports: [CommonModule],
  exports: [IfSpinnerErrorStatePipe, IfSpinnerDirective],
})
export class IfSpinnerModule {}
