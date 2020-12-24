import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ServicePhoto } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-service-photos',
    templateUrl: './service-photos.component.html',
    styleUrls: ['./service-photos.component.scss']
})
export class ServicePhotosComponent implements OnInit, OnDestroy {
    @Input() public serviceId: number;
    // TODO: make PaginatedResult type on backend for ServicePhotos
    public servicePhotos: Array<ServicePhoto> = [];
    // public servicePhotos: Observable<{
    //     count: number;
    //     next?: null | string;
    //     previous?: null | string;
    //     results: Array<ServicePhoto>;
    // }>;
    private readonly ngDestroy$ = new Subject<void>();

    constructor(private readonly accountsService: AccountsService, private readonly cd: ChangeDetectorRef) {}

    public ngOnInit(): void {
        console.log('serviceId', this.serviceId);

        this.subscribeServicePhotos();
    }

    public ngOnDestroy(): void {
        this.ngDestroy$.next();
        this.ngDestroy$.complete();
    }

    private subscribeServicePhotos(): void {
        // TODO: Make available to show all images (for MVP version only 4 images show)
        this.accountsService
            .accountsServicePhotosList({ service: `${this.serviceId}`, pageSize: 4 })
            .pipe(filter(res => Boolean(res)))
            .subscribe(res => {
                this.servicePhotos = res.results;
                console.log('subscribe this.servicePhotos', this.servicePhotos);
                this.cd.detectChanges();
            });
    }
}
