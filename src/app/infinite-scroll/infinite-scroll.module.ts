import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { InfiniteScrollContainerComponent } from './components/infinite-scroll-container/infinite-scroll-container.component';
import { InfiniteScrollEmptyListDirective } from './directives/infinite-scroll-empty-list.directive';
import { InfiniteScrollItemDirective } from './directives/infinite-scroll-item.directive';
import { InfiniteScrollLoadingDirective } from './directives/infinite-scroll-loading.directive';

@NgModule({
  declarations: [
    InfiniteScrollItemDirective,
    InfiniteScrollLoadingDirective,
    InfiniteScrollEmptyListDirective,
    InfiniteScrollContainerComponent,
  ],
  exports: [
    InfiniteScrollItemDirective,
    InfiniteScrollLoadingDirective,
    InfiniteScrollEmptyListDirective,
    InfiniteScrollContainerComponent,
  ],
  imports: [CommonModule, IonicModule],
})
export class InfiniteScrollModule {}
