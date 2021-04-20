import { Component, OnInit } from '@angular/core';
import { ProfessionalPhotoList } from '@app/api/models';
import { AccountsService, ProfessionalsService } from '@app/api/services';
import { acceptedMimeTypes } from '@app/core/constants/image.constants';
import { fileToBase64 } from '@app/core/functions/file.functions';
import { NgDestroyService } from '@app/core/services';
import ProfessionalPageStateModel from '@app/store/professional-page/professional-page-state.model';
import ProfessionalPageSelectors from '@app/store/professional-page/professional-page.selectors';
import { Select } from '@ngxs/store';
import { BehaviorSubject, forkJoin, from, Observable } from 'rxjs';
import { concatMap, finalize, first, map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-master-profile-portfolio',
  templateUrl: './master-profile-portfolio.component.html',
  styleUrls: ['./master-profile-portfolio.component.scss'],
  providers: [NgDestroyService],
})
export class MasterProfilePortfolioComponent implements OnInit {
  @Select(ProfessionalPageSelectors.context)
  public context$: Observable<ProfessionalPageStateModel>;

  public readonly photos$: BehaviorSubject<ProfessionalPhotoList[]> = new BehaviorSubject(null);
  public readonly pending$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly acceptedImageTypes = acceptedMimeTypes;

  private readonly masterPhotos$: Observable<ProfessionalPhotoList[]>;

  constructor(
    private readonly professionalsService: ProfessionalsService,
    private readonly accountsService: AccountsService,
    private readonly ngUnsubscribe$: NgDestroyService,
  ) {
    this.masterPhotos$ = this.context$.pipe(
      first(context => !!context?.professional),
      switchMap(context => this.professionalsService.professionalsProfessionalPhotosList({ professional: context.professional.id })),
      map(data => data.results),
    );
  }

  public ngOnInit(): void {
    this.masterPhotos$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(photosToAdd => {
      this.addPhotos(photosToAdd);
    });
  }

  public removeImage(photoId: number): void {
    this.accountsService.accountsProfessionalPhotosDelete(photoId).subscribe(() => {
      this.removePhotos([photoId]);
    });
  }

  public addImages(event: Event): void {
    const eventTarget = event.target as HTMLInputElement;
    const fileList: FileList = eventTarget.files;
    if (!fileList?.length) {
      return;
    }
    const files = Array.from(fileList);
    this.pending$.next(true);
    this.context$
      .pipe(
        first(),
        concatMap(({ professional }) =>
          forkJoin([
            ...files.map(file =>
              from(fileToBase64(file)).pipe(
                switchMap(photo => this.accountsService.accountsProfessionalPhotosCreate({ professional: professional.id, photo })),
              ),
            ),
          ]),
        ),
        finalize(() => {
          this.pending$.next(false);
        }),
        takeUntil(this.ngUnsubscribe$),
      )
      .subscribe(photosToAdd => {
        this.addPhotos(photosToAdd);
      });
  }

  private addPhotos(photosToAdd: ProfessionalPhotoList[]): void {
    this.photos$.next([...photosToAdd, ...(this.photos$.value ?? [])]);
  }

  private removePhotos(photoIdsToRemove: number[]): void {
    this.photos$.next(this.photos$.value.filter(({ id }) => !photoIdsToRemove.includes(id)));
  }
}
