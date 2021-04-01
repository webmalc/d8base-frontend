import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfessionalPhotoList } from '@app/api/models';
import { AccountsService, ProfessionalsService } from '@app/api/services';
import { fileToBase64 } from '@app/core/functions/file.functions';
import { HelperService } from '@app/core/services/helper.service';
import ProfessionalPageStateModel from '@app/store/professional-page/professional-page-state.model';
import ProfessionalPageSelectors from '@app/store/professional-page/professional-page.selectors';
import { Select } from '@ngxs/store';
import { BehaviorSubject, forkJoin, from, Observable, Subject } from 'rxjs';
import { concatMap, finalize, first, map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-master-profile-portfolio',
  templateUrl: './master-profile-portfolio.component.html',
  styleUrls: ['./master-profile-portfolio.component.scss'],
})
export class MasterProfilePortfolioComponent implements OnInit, OnDestroy {
  public readonly files: File[] = [];

  @Select(ProfessionalPageSelectors.context)
  public context$: Observable<ProfessionalPageStateModel>;

  public readonly photos$: BehaviorSubject<ProfessionalPhotoList[]> = new BehaviorSubject(null);
  public isAddPhotoButtonDisabled: boolean = true;
  public isDropzoneDisabled: boolean = false;

  private readonly masterPhotos$: Observable<ProfessionalPhotoList[]>;
  private readonly ngUnsubscribe$ = new Subject<void>();

  constructor(private readonly professionalsService: ProfessionalsService, private readonly accountsService: AccountsService) {
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

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  public dropzoneOnSelect(data: { addedFiles: File[] }): void {
    this.files.push(...data.addedFiles);
    this.disableAddPhotoButton(!this.files.length);
  }

  public dropzoneOnRemove(data: File): void {
    this.files.splice(this.files.indexOf(data), 1);
    this.disableAddPhotoButton(!this.files.length);
  }

  public removeImage(photoId: number): void {
    this.accountsService.accountsProfessionalPhotosDelete(photoId).subscribe(() => {
      this.removePhotos([photoId]);
    });
  }

  public addImages(): void {
    this.disableAddPhotoButton();
    this.disableDropzone();
    this.context$
      .pipe(
        first(),
        concatMap(({ professional }) =>
          forkJoin([
            ...this.files.map(file =>
              from(fileToBase64(file)).pipe(
                switchMap(photo => this.accountsService.accountsProfessionalPhotosCreate({ professional: professional.id, photo })),
              ),
            ),
          ]),
        ),
        finalize(() => {
          this.dropzoneClear();
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

  private dropzoneClear(): void {
    this.files.splice(0, this.files.length);
    this.disableAddPhotoButton();
    this.disableDropzone(false);
  }

  private disableAddPhotoButton(disabled: boolean = true): void {
    this.isAddPhotoButtonDisabled = disabled;
  }

  private disableDropzone(disabled: boolean = true): void {
    this.isDropzoneDisabled = disabled;
  }
}
