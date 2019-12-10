import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {MainGuard} from '../shared/guards/main.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        canActivate: [MainGuard]
      }
    ])
  ],
  declarations: [HomePage],
  providers: [MainGuard]
})
export class HomePageModule {}

