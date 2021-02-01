import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfessionalPhotoList } from '@app/api/models';
import { AccountsService, ProfessionalsService } from '@app/api/services';
import { HelperService } from '@app/core/services/helper.service';
import MasterProfileContext from '@app/master/interfaces/master-profile-context.interface';
import { MasterProfileContextService } from '@app/master/services/master-profile-context.service';
import { BehaviorSubject, forkJoin, from, Observable, Subject } from 'rxjs';
import { concatMap, first, map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-master-profile-portfolio',
  templateUrl: './master-profile-portfolio.component.html',
  styleUrls: ['./master-profile-portfolio.component.scss'],
})
export class MasterProfilePortfolioComponent implements OnInit, OnDestroy {
  public readonly files: File[] = [];
  public readonly context$: Observable<MasterProfileContext> = this.contextService.context$;
  public readonly photos$: BehaviorSubject<ProfessionalPhotoList[]> = new BehaviorSubject(null);

  private readonly masterPhotos$: Observable<ProfessionalPhotoList[]> = this.context$.pipe(
    first(context => !!context?.master),
    switchMap(context => this.professionalsService.professionalsProfessionalPhotosList({ professional: `${context.master.id}` })),
    map(data => data.results),
  );
  private readonly ngUnsubscribe$ = new Subject<void>();

  constructor(
    private readonly contextService: MasterProfileContextService,
    private readonly professionalsService: ProfessionalsService,
    private readonly accountsService: AccountsService,
  ) {}

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
  }

  public dropzoneOnRemove(data: File): void {
    this.files.splice(this.files.indexOf(data), 1);
  }

  public removeImage(photoId: number): void {
    this.accountsService.accountsProfessionalPhotosDelete(photoId).subscribe(() => {
      this.removePhotos([photoId]);
    });
  }

  public addImages(): void {
    this.context$
      .pipe(
        concatMap(({ master }) =>
          forkJoin([
            ...this.files.map(file =>
              from(HelperService.getImgBase64(file)).pipe(
                switchMap(photo => this.accountsService.accountsProfessionalPhotosCreate({ professional: master.id, photo })),
              ),
            ),
          ]),
        ),
        takeUntil(this.ngUnsubscribe$),
      )
      .subscribe(photosToAdd => {
        this.dropzoneClear();
        this.addPhotos(photosToAdd);
      });
  }

  private addPhotos(photosToAdd: ProfessionalPhotoList[]) {
    this.photos$.next([...photosToAdd, ...(this.photos$.value ?? [])]);
  }
  private removePhotos(photoIdsToRemove: number[]) {
    this.photos$.next(this.photos$.value.filter(({ id }) => !photoIdsToRemove.includes(id)));
  }
  private dropzoneClear(): void {
    this.files.splice(0, this.files.length);
  }
}
