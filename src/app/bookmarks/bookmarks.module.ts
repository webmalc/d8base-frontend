import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { BookmarksListPageComponent } from './bookmarks-list-page.component';
import { SavedProfessionalsRoutingModule } from './saved-professionals-routing.module';

@NgModule({
  declarations: [BookmarksListPageComponent],
  exports: [BookmarksListPageComponent],
  imports: [CommonModule, SharedModule, SavedProfessionalsRoutingModule, IonicModule, TranslateModule],
})
export class BookmarksModule {}
