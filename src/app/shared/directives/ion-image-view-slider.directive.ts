import { AfterViewInit, ContentChildren, Directive, EventEmitter, OnDestroy, Output, QueryList } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { merge, Subject } from 'rxjs';
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { PhotoPopoverComponent } from '../components/photo-popover/photo-popover.component';
import { IonImageViewDirective } from './ion-image-view.directive';

@Directive({
  selector: '[appViewImageSlider]',
})
export class IonImageViewSliderDirective implements OnDestroy, AfterViewInit {
  @ContentChildren(IonImageViewDirective, { descendants: true }) public readonly imageViews!: QueryList<IonImageViewDirective>;
  @Output() public delete = new EventEmitter<number>();
  private readonly ngUnsubscribe$ = new Subject<void>();

  constructor(private readonly modalController: ModalController) {}

  public ngAfterViewInit(): void {
    this.subscribeImagesClicks();
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  private async createPopover(photos: string[], photoIndex: number): Promise<void> {
    const pop = await this.modalController.create({
      component: PhotoPopoverComponent,
      cssClass: 'modal-fullscreen',
      componentProps: {
        photos,
        photoIndex,
      },
    });

    pop.onDidDismiss().then(data => {
      if (data.data.delete) {
        this.delete.emit(photoIndex);
      }
    });

    return await pop.present();
  }

  private subscribeImagesClicks(): void {
    this.imageViews.changes
      .pipe(
        startWith(0),
        switchMap(() => merge(...this.imageViews.map((imageView, index) => imageView.imageClick.pipe(map(() => index))))),
        takeUntil(this.ngUnsubscribe$),
      )
      .subscribe(photoIndex => {
        this.createPopover(
          this.imageViews.map(imageView => imageView.fullSizeSrc ?? imageView.src),
          photoIndex,
        );
      });
  }
}
