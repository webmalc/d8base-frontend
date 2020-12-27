import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'app-service-photo-loader',
    templateUrl: './service-photo-loader.component.html',
    styleUrls: ['./service-photo-loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicePhotoLoaderComponent {
    @Input() public src: string;
    @HostBinding('class.loading') public isLoading: boolean = false;

    public ionImgWillLoad(): void {
        this.isLoading = true;
    }

    public ionImgDidLoad(): void {
        this.isLoading = false;
    }

    public ionError(): void {
        this.isLoading = false;
    }
}
