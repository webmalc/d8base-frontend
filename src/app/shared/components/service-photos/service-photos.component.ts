import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import { ServicePhotoList } from '@app/api/models';
import { ServicesService } from '@app/api/services';
import { IonSlides, PopoverController } from '@ionic/angular';
import { from, Observable, Subject } from 'rxjs';
import { filter, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { ServicePhotoPopoverComponent } from '../service-photo-popover/service-photo-popover.component';

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
        slidesPerView: 4,
        loop: false,
        centeredSlides: false
    };
    public isNextButtonDisabled$: Observable<boolean>;
    public isPrevButtonDisabled$: Observable<boolean>;
    @HostBinding('class.loading') public isLoading: boolean = false;
    @ViewChild('slides', { static: false }) private readonly slides: IonSlides;
    private readonly ngDestroy$ = new Subject<void>();

    constructor(
        private readonly servicesService: ServicesService,
        private readonly cd: ChangeDetectorRef,
        private readonly popoverController: PopoverController
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
                    this.cd.markForCheck();
                },
                error: () => {
                    this.isLoading = false;
                    this.cd.markForCheck();
                }
            });
    }

    private async createPopover(src: string): Promise<void> {
        const pop = await this.popoverController.create({
            component: ServicePhotoPopoverComponent,
            translucent: true,
            cssClass: 'popover-big',
            componentProps: {
                src
            }
        });
        await pop.present();
    }
}
