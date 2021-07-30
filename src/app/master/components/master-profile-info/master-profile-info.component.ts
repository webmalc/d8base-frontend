import { Component } from '@angular/core';
import { ReviewList } from '@app/api/models';
import { CommunicationService } from '@app/api/services';
import { calculateAge } from '@app/core/functions/datetime.functions';
import { declination } from '@app/core/functions/string.functions';
import { ContactUnion } from '@app/core/models/contact-union';
import { ContactsMergeToDefaultService } from '@app/core/services/contacts-merge-to-default.service';
import { FullLocationService } from '@app/core/services/location/full-location.service';
import ProfessionalContactSelectors from '@app/store/professional-page/professional-contacts/professional-contacts.selectors';
import { ProfessionalContactStateModel } from '@app/store/professional-page/professional-contacts/professional-contacts.state';
import ProfessionalLocationSelectors from '@app/store/professional-page/professional-locations/professional-locations.selectors';
import { ProfessionalLocationStateModel } from '@app/store/professional-page/professional-locations/professional-locations.state';
import ProfessionalPageStateModel from '@app/store/professional-page/professional-page-state.model';
import ProfessionalPageSelectors from '@app/store/professional-page/professional-page.selectors';
import { Select } from '@ngxs/store';
import { forkJoin, Observable } from 'rxjs';
import { filter, map, share, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-master-profile-info',
  templateUrl: './master-profile-info.component.html',
  styleUrls: ['./master-profile-info.component.scss'],
})
export class MasterProfileInfoComponent {
  @Select(ProfessionalPageSelectors.context)
  public context$: Observable<ProfessionalPageStateModel>;

  @Select(ProfessionalContactSelectors.contacts)
  public contacts$: Observable<ProfessionalContactStateModel>;

  @Select(ProfessionalLocationSelectors.locations)
  public editableLocations$: Observable<ProfessionalLocationStateModel>;

  public contactsWithDefault$: Observable<ContactUnion[]>;

  public contextFiltered$: Observable<ProfessionalPageStateModel>;
  public locations$: Observable<{ id: number; text: string }[]>;
  public readonly editDefaultUrl = 'professional-contact-add-default/';
  public readonly editUrl = 'professional-contact-edit/';
  public readonly addUrl = 'professional-contact-add/';
  public readonly reviews$: Observable<ReviewList[]>;
  public readonly reviewsCount$: Observable<number>;

  constructor(
    private readonly fullLocationService: FullLocationService,
    private readonly communicationService: CommunicationService,
    private readonly contactsMergeToDefaultService: ContactsMergeToDefaultService,
  ) {
    this.contextFiltered$ = this.context$.pipe(
      filter(context => Boolean(context?.professional) && Boolean(context?.user)),
    );

    this.locations$ = this.contextFiltered$.pipe(
      switchMap(({ professional }) =>
        forkJoin(professional.locations.map(x => this.fullLocationService.getTextLocation(x))),
      ),
    );

    const reviews$ = this.contextFiltered$.pipe(
      map(({ professional }) => professional),
      switchMap(professional =>
        this.communicationService.communicationReviewsList({
          pageSize: 5,
          professional: professional.id,
        }),
      ),
      share(),
    );

    this.reviews$ = reviews$.pipe(map(({ results }) => results));
    this.reviewsCount$ = reviews$.pipe(map(({ count }) => count));

    this.initContactsWithDefault();
  }

  public declinationYears(num: number): string {
    return declination(num, ['declination.years.1', 'declination.years.2', 'declination.years.3']);
  }

  public getYearsFromBirthday(birthday: string): number {
    return calculateAge(birthday);
  }

  public declineReviews(num: number): string {
    return declination(num, ['declination.reviews.1', 'declination.reviews.2', 'declination.reviews.3']);
  }

  private initContactsWithDefault(): void {
    this.contactsWithDefault$ = this.contactsMergeToDefaultService.contactsMergedWithDefault(this.contacts$);
  }
}
