import { Injectable } from '@angular/core';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { debounceTime, filter } from 'rxjs/operators';
import { isNavigationEvent } from '@app/core/functions/navigation.functions';
import { MAX_DELAY_MS } from '@app/core//constants/ui.constants';

@Injectable({ providedIn: 'root' })
export class LoadingIndicatorService {
  private loading: HTMLIonLoadingElement;

  constructor(
    private readonly router: Router,
    private readonly loadingController: LoadingController,
  ) {
    this.subscribeOnLoading();
  }

  private subscribeOnLoading(): void {
    this.router.events.pipe(
      filter(isNavigationEvent),
      debounceTime(MAX_DELAY_MS),
    ).subscribe(async (routerEvent: RouterEvent) =>
      (routerEvent instanceof NavigationStart) ? await this.showLoadingIndicator() : await this.hideLoadingIndicator(),
    );
  }

  private async showLoadingIndicator(): Promise<void> {
    if (!this.loading) {
      this.loading = await this.loadingController.create();
      await this.loading.present();
    }
  }

  private async hideLoadingIndicator(): Promise<void> {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}
