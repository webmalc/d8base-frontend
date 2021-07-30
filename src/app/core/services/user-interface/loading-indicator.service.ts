import { Injectable } from '@angular/core';
import { MAX_DELAY_MS } from '@app/core//constants/ui.constants';
import LoaderSelectors from '@app/store/loader/loader.selectors';
import { LoadingController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { of, timer } from 'rxjs';
import { audit, distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class LoadingIndicatorService {
  private loading: Promise<HTMLIonLoadingElement>;

  constructor(private readonly loadingController: LoadingController, private readonly store: Store) {
    this.subscribeLoaderState();
  }

  private subscribeLoaderState(): void {
    this.store
      .select(LoaderSelectors.isLoaderShown)
      .pipe(
        distinctUntilChanged(),
        audit(isLoaderShown => (isLoaderShown ? timer(MAX_DELAY_MS) : of(true))),
      )
      .subscribe(async isLoaderShown => {
        isLoaderShown ? await this.showLoadingIndicator() : await this.hideLoadingIndicator();
      });
  }

  private async showLoadingIndicator(): Promise<void> {
    if (!this.loading) {
      this.loading = this.loadingController.create();
      const indicator = await this.loading;
      await indicator.present();
    }
  }

  private async hideLoadingIndicator(): Promise<void> {
    if (this.loading) {
      const indicator = await this.loading;
      this.loading = null;
      await indicator.dismiss();
    }
  }
}
