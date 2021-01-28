import { Component } from '@angular/core';
import { ReviewList } from '@app/api/models';
import { CommunicationService } from '@app/api/services';
import { HelperService } from '@app/core/services/helper.service';
import { FullLocationService } from '@app/core/services/location/full-location.service';
import MasterProfileContext from '@app/master/interfaces/master-profile-context.interface';
import { MasterProfileContextService } from '@app/master/services/master-profile-context.service';
import { Language } from '@app/profile/models/language';
import { LanguagesApiService } from '@app/profile/services/languages-api.service';
import { forkJoin, Observable } from 'rxjs';
import { first, map, share, shareReplay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-master-profile-info',
  templateUrl: './master-profile-info.component.html',
  styleUrls: ['./master-profile-info.component.scss'],
})
export class MasterProfileInfoComponent {
  public context$: Observable<MasterProfileContext> = this.context.context$.pipe(
    first(context => Boolean(context?.master) && Boolean(context?.user)),
  );
  public languages$: Observable<Language[]>;
  public locations$: Observable<{ id: number; text: string }[]>;
  public readonly editDefaultUrl = 'professional-contact-add-default/';
  public readonly editUrl = 'professional-contact-edit/';
  public readonly addUrl = 'professional-contact-add/';
  public readonly reviews$: Observable<ReviewList[]>;
  public readonly reviewsCount$: Observable<number>;

  constructor(
    private readonly fullLocationService: FullLocationService,
    private readonly communicationService: CommunicationService,
    private readonly context: MasterProfileContextService,
    languagesApi: LanguagesApiService,
  ) {
    this.context$ = context.context$.pipe(first(context => Boolean(context?.master) && Boolean(context?.user)));

    this.languages$ = this.context$.pipe(
      switchMap(({ user }) => languagesApi.getList(user.languages.map(lang => lang?.language))),
      shareReplay(1),
    );

    this.locations$ = this.context$.pipe(
      switchMap(({ master }) => forkJoin(master.locations.map(x => this.fullLocationService.getTextLocation(x)))),
    );

    const reviews$ = this.context$.pipe(
      map(({ master }) => master),
      switchMap(professional =>
        this.communicationService.communicationReviewsList({
          pageSize: 5,
          professional: `${professional.id}`,
        }),
      ),
      share(),
    );

    this.reviews$ = reviews$.pipe(map(({ results }) => results));
    this.reviewsCount$ = reviews$.pipe(map(({ count }) => count));
  }

  public declinationYears(num: number): string {
    return HelperService.declination(num, ['declination.years.1', 'declination.years.2', 'declination.years.3']);
  }

  public getYearsFromBirthday(birthday: string): number {
    return HelperService.calculateAge(birthday);
  }
}
