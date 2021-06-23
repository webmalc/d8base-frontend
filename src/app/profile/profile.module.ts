import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutEditComponent } from '@app/profile/components/about-edit/about-edit.component';
import { ChangeEmailComponent } from '@app/profile/components/change-email/change-email.component';
import { UserEditComponent } from '@app/profile/components/user-edit/user-edit.component';
import { SharedModule } from '@app/shared/shared.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';
import { UserContactEditComponent } from './components/user-contact-edit/user-contact-edit.component';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedModule,
    LeafletModule,
    IonicSelectableModule,
  ],
  declarations: [ProfilePage, UserContactEditComponent, UserEditComponent, AboutEditComponent, ChangeEmailComponent],
})
export class ProfilePageModule {}
