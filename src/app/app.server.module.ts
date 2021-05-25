import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { IonicServerModule } from '@ionic/angular-server';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [AppModule, ServerModule, IonicServerModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
