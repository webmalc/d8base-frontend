import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { ServicePhotoList } from '@app/api/models';
import { ServicesService } from '@app/api/services';
import { IonSlides, ModalController } from '@ionic/angular';
import { from, Observable, Subject } from 'rxjs';
import { finalize, startWith, switchMap, takeUntil } from 'rxjs/operators';

const spaceBetweenSlides: number = 16;

@Component({
    selector: 'app-service-photos',
    templateUrl: './service-photos.component.html',
    styleUrls: ['./service-photos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicePhotosComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() public serviceId: number;
    public servicePhotos: ServicePhotoList[] = [];
    public slideOptions = {
        initialSlide: 0,
        slidesPerView: 'auto',
        slidesPerGroup: 3,
        loop: false,
        centeredSlides: false,
        spaceBetween: spaceBetweenSlides
    };
    public isNextButtonDisabled$: Observable<boolean>;
    public isPrevButtonDisabled$: Observable<boolean>;
    @HostBinding('class.nav-buttons-hidden') public isNavButtonsHidden: boolean = true;
    @HostBinding('class.loading') private isLoading: boolean = false;
    @ViewChild('slides', { static: false }) private readonly slides: IonSlides;
    @ViewChild('slides', { read: ElementRef }) private readonly slidesElementRef: ElementRef;
    @ViewChildren('slide', { read: ElementRef }) private readonly slideList: QueryList<ElementRef>;
    private readonly ngDestroy$ = new Subject<void>();

    constructor(
        private readonly servicesService: ServicesService,
        private readonly cd: ChangeDetectorRef,
        private readonly modalController: ModalController
    ) {}

    public ngOnInit(): void {
        this.subscribeServicePhotos();
    }

    public ngOnDestroy(): void {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }

    public ngAfterViewInit(): void {
        this.initNavigationButtonsAbility();
    }

    public slideNext(): void {
        this.slides.slideNext();
    }

    public slidePrev(): void {
        this.slides.slidePrev();
    }

    private initNavigationButtonsAbility(): void {
        this.isPrevButtonDisabled$ = this.slides.ionSlideDidChange.pipe(
            switchMap(() => from(this.slides.isBeginning())),
            startWith(true)
        );
        this.isNextButtonDisabled$ = this.slides.ionSlideDidChange.pipe(switchMap(() => from(this.slides.isEnd())));
    }

    private subscribeServicePhotos(): void {
        this.isLoading = true;
        this.servicesService
            .servicesServicePhotosList({ service: `${this.serviceId}` })
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                    this.cd.markForCheck();
                })
            )
            .subscribe(res => {
                this.isLoading = false;
                this.servicePhotos = res.results;
                this.subscribeSlideListChanges();
                this.cd.markForCheck();
            });
    }

    private subscribeSlideListChanges(): void {
        this.slideList.changes.pipe(takeUntil(this.ngDestroy$)).subscribe(slideList => {
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
