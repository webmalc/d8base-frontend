import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NgDestroyService } from '@app/core/services';
import { IonSlides } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import Photo from './photo.interface';

const spaceBetweenSlides: number = 16;

const toBase64 = file => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
  providers: [NgDestroyService],
})
export class ImageCarouselComponent implements AfterViewInit {
  @Input()
  public editable: boolean = false;

  @Output()
  public add = new EventEmitter<File[]>();

  @ViewChild('slides', { static: false })
  public readonly slides: IonSlides;

  @ViewChild('slides', { read: ElementRef })
  public readonly slidesElementRef: ElementRef;

  @ViewChild('input', { static: true })
  public readonly input: ElementRef<HTMLInputElement>;

  @ViewChildren('slide', { read: ElementRef })
  public readonly slideList: QueryList<ElementRef>;

  @HostBinding('class.nav-buttons-hidden')
  public isNavButtonsHidden: boolean = true;

  public slideOptions = {
    initialSlide: 0,
    slidesPerView: 'auto',
    slidesPerGroup: 3,
    loop: false,
    centeredSlides: false,
    spaceBetween: spaceBetweenSlides,
  };
  public isNextButtonDisabled$: Observable<boolean>;
  public isPrevButtonDisabled$: Observable<boolean>;
  private _photos: Photo[];

  constructor(
    private readonly ngDestroy$: NgDestroyService,
    private readonly cd: ChangeDetectorRef,
  ) {
  }

  @Input()
  public set files(files: File[]) {
    const getPhotos = files.map(async file => {
      const src = await toBase64(file);
      return {
        photo: src,
        photo_thumbnail: src,
      };
    });
    Promise.all(getPhotos).then(photos => {
      this.photos = photos;
      this.cd.markForCheck();
    });
  }

  @Input()
  public set photos(value: Photo[]) {
    this._photos = value;
    this.subscribeSlideListChanges();
  }

  public get photos(): Photo[] {
    return this._photos;
  }

  public ngAfterViewInit(): void {
    this.initNavigationButtonsAvailability();
  }

  public showFileSelectionDialog(): void {
    this.input.nativeElement.value = '';
    this.input.nativeElement.click();
  }

  public addFiles(event: Event): void {
    const eventTarget = event.target as HTMLInputElement;
    const fileList: FileList = eventTarget.files;
    if (fileList?.length) {
      this.add.emit(Array.from(fileList));
    }
  }

  public slideNext(): void {
    this.slides.slideNext();
  }

  public slidePrev(): void {
    this.slides.slidePrev();
  }

  private initNavigationButtonsAvailability(): void {
    if (!this.slides) {
      return;
    }
    this.isPrevButtonDisabled$ = this.slides.ionSlideDidChange.pipe(
      switchMap(() => from(this.slides.isBeginning())),
      startWith(true),
    );
    this.isNextButtonDisabled$ = this.slides.ionSlideDidChange.pipe(switchMap(() => from(this.slides.isEnd())));
  }

  private subscribeSlideListChanges(): void {
    this.ngDestroy$.next();
    this.slideList?.changes.pipe(takeUntil(this.ngDestroy$)).subscribe(slideList => {
      setTimeout(() => {
        const allSlidesWidth = slideList
          .map(({ nativeElement }) => nativeElement.clientWidth)
          .reduce((accWidth: number, currentWidth: number) => accWidth + currentWidth + spaceBetweenSlides, -spaceBetweenSlides);
        this.isNavButtonsHidden = !allSlidesWidth || this.slidesElementRef.nativeElement.clientWidth > allSlidesWidth;
        this.cd.markForCheck();
      });
    });
  }
}
