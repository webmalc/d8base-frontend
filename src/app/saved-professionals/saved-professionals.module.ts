import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { UserSavedProfessionalsListComponent } from './components/user-saved-professionals-list/user-saved-professionals.component';
import { SavedProfessionalsRoutingModule } from './saved-professionals-routing.module';

@NgModule({
  declarations: [UserSavedProfessionalsListComponent],
  exports: [UserSavedProfessionalsListComponent],
  imports: [CommonModule, SharedModule, SavedProfessionalsRoutingModule, IonicModule, TranslateModule],
})
export class SavedProfessionalsModule {}
