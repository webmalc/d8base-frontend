import { Injectable } from '@angular/core';
import { City, Country } from '@app/api/models';
import { GuessLocationByIpService } from '@app/core/services/guess-location-by-ip.service';
import { OnMapPopoverComponent } from '@app/shared/components/on-map-popover/on-map-popover.component';
import { AlertController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { concat, from, Observable } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';

interface Resolved {
  country: Country;
  city: City;
}

@Injectable({
  providedIn: 'root',
})
export class CurrentLocationService {
  constructor(
    private readonly guessByIp: GuessLocationByIpService,
    private readonly alertController: AlertController,
    private readonly popoverController: PopoverController,
    private readonly translator: TranslateService,
  ) {}

  public guessLocation(): Observable<Resolved> {
    const guesses$ = concat([
      this.guessByIp.guess(),
      // TODO add more guess methods
    ]);

    return guesses$.pipe(
      mergeMap(x => x),
      first(x => !!x),
      mergeMap(resolved => from(this.confirmLocation(resolved))),
    );
  }

  private async confirmLocation(guessedLocation: Resolved): Promise<Resolved> {
    const { city } = guessedLocation;
    const alert = await this.alertController.create({
      subHeader: this.translator.instant('city-confirmation.title', { city: city.name }),
      buttons: [
        { text: this.translator.instant('global.yn.y'), role: 'confirm' },
        { text: this.translator.instant('city-confirmation.choose'), role: 'choose' },
      ],
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
    if (role === 'confirm') {
      return guessedLocation;
    }
    if (role === 'choose') {
      return this.specifyNewLocation(guessedLocation);
    }

    return null;
  }

  private async specifyNewLocation(guessedLocation: Resolved): Promise<Resolved> {
    const { country, city } = guessedLocation;
    const popover = await this.popoverController.create({
      component: OnMapPopoverComponent,
      translucent: true,
      animated: true,
      componentProps: {
        data: { country, city },
      },
      cssClass: ['map-popover-width'],
    });

    await popover.present();
    const { data } = await popover.onDidDismiss();
    return { country: data.country, city: data.city };
  }
}
