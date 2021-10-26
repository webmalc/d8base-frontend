import { Component, Input } from '@angular/core';
import { getServiceDuration } from '@app/core/functions/price.functions';
import { declination } from '@app/core/functions/string.functions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-duration-viewer',
  templateUrl: './duration-viewer.component.html',
  styleUrls: ['./duration-viewer.component.scss'],
})
export class DurationViewerComponent {
  public durationString: string;

  constructor(private readonly translateService: TranslateService) {}

  @Input()
  public set duration(duration: number) {
    const dur = getServiceDuration(duration);
    let days = '';
    let hours = '';
    let minutes = '';
    if (dur.days) {
      days = `${dur.days} ${this.translateService.instant(
        declination(dur.days, ['declination.days.1', 'declination.days.2', 'declination.days.3']),
      )}`;
    }
    if (dur.hours) {
      hours = `${dur.hours} ${this.translateService.instant(
        declination(dur.hours, ['declination.hours.1', 'declination.hours.2', 'declination.hours.3']),
      )}`;
    }
    if (dur.minutes) {
      minutes = `${dur.minutes} ${this.translateService.instant(
        declination(dur.minutes, ['declination.minutes.1', 'declination.minutes.2', 'declination.minutes.3']),
      )}`;
    }

    this.durationString = `${days} ${hours} ${minutes}`;
  }
}
