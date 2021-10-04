import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { InfiniteScrollContainerComponent } from './components/infinite-scroll-container/infinite-scroll-container.component';
import { InfiniteScrollItemDirective } from './directives/infinite-scroll-item.directive';

@NgModule({
  declarations: [InfiniteScrollItemDirective, InfiniteScrollContainerComponent],
  exports: [InfiniteScrollItemDirective, InfiniteScrollContainerComponent],
  imports: [CommonModule, IonicModule, SharedModule],
})
export class InfiniteScrollModule {}
