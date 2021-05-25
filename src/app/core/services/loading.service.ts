import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(private readonly loadingController: LoadingController) {}

  public presentLoading(): void {
    this.loadingController.create().then(c => c.present());
  }

  public loadingDismiss(): void {
    this.loadingController.dismiss();
  }
}
