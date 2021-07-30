import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

interface ToastServiceParams {
  duration?: number;
  translate?: boolean;
}

const ERROR_TOAST_DURATION_MS = 3000;

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(
    private readonly toastController: ToastController,
    private readonly translateService: TranslateService,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  public showError(error: string, params: ToastServiceParams = {}): void {
    const duration = params.duration ?? ERROR_TOAST_DURATION_MS;
    const translate = Boolean(params.translate);
    const message = translate ? this.translateService.instant(error) : error;
    if (isPlatformServer(this.platformId)) {
      console.error(message);
    } else {
      this.toastController.create({ message, duration }).then(toast => toast.present());
    }
  }
}
