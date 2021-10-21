import { Component } from '@angular/core';
import { ProfessionalList, ProfessionalPhotoList, ReviewList, UserExtended } from '@app/api/models';
import { CommunicationService, ServicesService } from '@app/api/services';
import { calculateAge } from '@app/core/functions/datetime.functions';
import {
  getNewProfessionalContactUrl,
  getNewProfessionalLocationsUrl,
  getProfessionalScheduleUrl,
  getProfessionalServicesUrl,
  getUserChatUrl,
} from '@app/core/functions/navigation.functions';
import { getProfessionalName } from '@app/core/functions/professional.functions';
import { ContactUnion } from '@app/core/models/contact-union';
import { NgDestroyService } from '@app/core/services';
import { ContactsMergeToDefaultService } from '@app/core/services/contacts-merge-to-default.service';
import { LocationResolverService } from '@app/core/services/location/location-resolver.service';
import { ProfessionalPhotosEditorService } from '@app/professional/services/professional-photos-editor.service';
import ProfessionalContactSelectors from '@app/store/professional-page/professional-contacts/professional-contacts.selectors';
import { ProfessionalContactStateModel } from '@app/store/professional-page/professional-contacts/professional-contacts.state';
import ProfessionalLocationSelectors from '@app/store/professional-page/professional-locations/professional-locations.selectors';
import { ProfessionalLocationStateModel } from '@app/store/professional-page/professional-locations/professional-locations.state';
import ProfessionalPageStateModel from '@app/store/professional-page/professional-page-state.model';
import ProfessionalPageSelectors from '@app/store/professional-page/professional-page.selectors';
import { Select } from '@ngxs/store';
import { forkJoin, Observable } from 'rxjs';
import { filter, first, map, share, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-professional-page',
  templateUrl: './professional-page.component.html',
  styleUrls: ['./professional-page.component.scss'],
  providers: [NgDestroyService, ProfessionalPhotosEditorService],
})
export class ProfessionalPageComponent {
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
  public readonly reviews$: Observable<ReviewList[]>;
  public readonly reviewsCount$: Observable<number>;
  public readonly servicesCount$: Observable<number>;

  constructor(
    private readonly fullLocationService: LocationResolverService,
    private readonly communicationService: CommunicationService,
    private readonly contactsMergeToDefaultService: ContactsMergeToDefaultService,
    private readonly professionalPhotosEditor: ProfessionalPhotosEditorService,
    private readonly servicesService: ServicesService,
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
    this.servicesCount$ = this.contextFiltered$.pipe(
      map(({ professional }) => professional),
      switchMap(professional => this.servicesService.servicesServicesList({ professional: professional.id })),
      map(list => list.count),
    );

    this.initContactsWithDefault();
  }

  public get photos$(): Observable<ProfessionalPhotoList[]> {
    return this.professionalPhotosEditor.photos$;
  }

  public getProfessionalChatUrl(professional: ProfessionalList): string {
    return getUserChatUrl(professional.user.id);
  }

  public getProfessionalServicesUrl(professional: ProfessionalList): string {
    return getProfessionalServicesUrl(professional.id);
  }

  public getProfessionalScheduleUrl(professional: ProfessionalList): string {
    return getProfessionalScheduleUrl(professional.id);
  }

  public isDescriptionEmpty(professional: ProfessionalList): boolean {
    return !professional.description && !professional.experience && !professional.level;
  }

  public isUserInfoEmpty(user: UserExtended): boolean {
    return !user.gender && !user.birthday && !user.nationality && !user.languages?.length;
  }

  public addPhotos(files: File[]): void {
    if (!files?.length) {
      return;
    }
    this.professionalPhotosEditor.addImages(files);
  }

  public removePhoto(index: number): void {
    this.photos$.pipe(first()).subscribe(photos => this.professionalPhotosEditor.removeImage(photos[index].id));
  }

  public getNewContactUrl(professionalId: number): string {
    return getNewProfessionalContactUrl(professionalId);
  }

  public getNewLocationUrl(professionalId: number): string {
    return getNewProfessionalLocationsUrl(professionalId);
  }

  public getYearsFromBirthday(birthday: string): number {
    return calculateAge(birthday);
  }

  public professionalName(professional: ProfessionalList): string {
    return getProfessionalName(professional);
  }

  private initContactsWithDefault(): void {
    this.contactsWithDefault$ = this.contactsMergeToDefaultService.contactsMergedWithDefault(this.contacts$);
  }
}
