import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ServicePhotoList } from '@app/api/models';
import { ServicesService } from '@app/api/services';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-service-photos',
  templateUrl: './service-photos.component.html',
  styleUrls: ['./service-photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicePhotosComponent implements OnInit {
  @Input() public serviceId: number;
  public servicePhotos: ServicePhotoList[] = [];

  constructor(private readonly servicesService: ServicesService, private readonly cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.subscribeServicePhotos();
  }

  private subscribeServicePhotos(): void {
    if (!this.serviceId) {
      return;
    }
    this.servicesService
      .servicesServicePhotosList({ service: this.serviceId })
      .pipe(
        finalize(() => {
          this.cd.markForCheck();
        }),
      )
      .subscribe(res => {
        this.servicePhotos = res.results;
        this.cd.markForCheck();
      });
  }
}
