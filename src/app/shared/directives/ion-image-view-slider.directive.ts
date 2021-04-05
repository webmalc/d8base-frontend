import { AfterViewInit, ContentChildren, Directive, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { NgDestroyService } from '@app/core/services';
import { ModalController } from '@ionic/angular';
import { merge } from 'rxjs';
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { PhotoPopoverComponent } from '../components/photo-popover/photo-popover.component';
import { IonImageViewDirective } from './ion-image-view.directive';

@Directive({
  selector: '[appViewImageSlider]',
  providers: [NgDestroyService],
})
export class IonImageViewSliderDirective implements AfterViewInit {
  @ContentChildren(IonImageViewDirective, { descendants: true }) public readonly imageViews!: QueryList<IonImageViewDirective>;
  @Input() public canDelete: boolean;
  @Output() public delete = new EventEmitter<number>();

  constructor(
    private readonly modalController: ModalController,
    private readonly ngDestroy$: NgDestroyService,
  ) {}

  public ngAfterViewInit(): void {
    this.subscribeImagesClicks();
  }

  private async createPopover(photos: string[], photoIndex: number): Promise<void> {
    const pop = await this.modalController.create({
      component: PhotoPopoverComponent,
      cssClass: 'modal-fullscreen',
      componentProps: {
        photos,
        photoIndex,
        canDelete: this.canDelete,
      },
    });

    pop.onDidDismiss().then(data => {
      if (data.data?.delete) {
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
        takeUntil(this.ngDestroy$),
      )
      .subscribe(photoIndex => {
        this.createPopover(
          this.imageViews.map(imageView => imageView.fullSizeSrc ?? imageView.src),
          photoIndex,
        );
      });
  }
}
