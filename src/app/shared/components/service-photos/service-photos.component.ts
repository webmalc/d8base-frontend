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
import { filter, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { ServicePhotoPopoverComponent } from '../service-photo-popover/service-photo-popover.component';

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
    public slideOptsTwo = {
        initialSlide: 0,
        slidesPerView: 'auto',
        slidesPerGroup: 3,
        loop: false,
        centeredSlides: false,
        spaceBetween: spaceBetweenSlides
    };
    public isNextButtonDisabled$: Observable<boolean>;
    public isPrevButtonDisabled$: Observable<boolean>;
    @ViewChild('slides', { static: false }) private readonly slides: IonSlides;
    @ViewChild('slides', { read: ElementRef }) private readonly slidesElementRef: ElementRef;
    @ViewChildren('slide', { read: ElementRef }) private readonly slideList: QueryList<ElementRef>;
    @HostBinding('class.loading') private isLoading: boolean = false;
    @HostBinding('class.nav-buttons-hidden') get isNavButtonsHidden(): boolean {
        return this.allSlidesContainerWidth > this.allSlidesWidth;
    }
    private allSlidesWidth: number = 0;
    private allSlidesContainerWidth: number = 0;
    private readonly ngDestroy$ = new Subject<void>();
    private observer;

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
        this.observer.unobserve(this.slidesElementRef.nativeElement);
    }

    public ngAfterViewInit(): void {
        this.initNavigationButtonsAbility();

        // @ts-ignore
        this.observer = new ResizeObserver(() => {
            this.setAllSlidesContainerWidth();
        });
        this.observer.observe(this.slidesElementRef.nativeElement);
    }

    public slideNext(): void {
        this.slides.slideNext();
    }

    public slidePrev(): void {
        this.slides.slidePrev();
    }

    public zoomPhoto(servicePhoto: ServicePhotoList): void {
        this.createPopover(servicePhoto.photo);
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
                filter(res => Boolean(res)),
                takeUntil(this.ngDestroy$)
            )
            .subscribe({
                next: res => {
                    this.isLoading = false;
                    this.servicePhotos = res.results;
                    this.subscribeSlideListChanges();
                    this.cd.markForCheck();
                },
                error: () => {
                    this.isLoading = false;
                    this.cd.markForCheck();
                }
            });
    }

    private async createPopover(src: string): Promise<void> {
        const pop = await this.modalController.create({
            component: ServicePhotoPopoverComponent,
            cssClass: 'modal-fullscreen',
            componentProps: {
                src
            }
        });

        return await pop.present();
    }

    private subscribeSlideListChanges(): void {
        this.slideList.changes.pipe(takeUntil(this.ngDestroy$)).subscribe(slideList => {
            setTimeout(() => {
                this.allSlidesWidth = slideList
                    .map(({ nativeElement }) => nativeElement.clientWidth)
                    .reduce((accWidth: number, currentWidth: number) => accWidth + currentWidth + spaceBetweenSlides, -spaceBetweenSlides);
                this.setAllSlidesContainerWidth();
            });
        });
    }

    private setAllSlidesContainerWidth(): void {
        this.allSlidesContainerWidth = this.slidesElementRef.nativeElement.clientWidth;
    }
}
