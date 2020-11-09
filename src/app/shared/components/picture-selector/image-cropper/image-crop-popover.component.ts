import {Component, Input, OnInit} from '@angular/core';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
    selector: 'app-image-crop-popover',
    templateUrl: './image-crop-popover.component.html',
    styleUrls: ['./image-crop-popover.component.scss']
})
export class ImageCropPopoverComponent implements OnInit {
    @Input() public file: File = null;

    public imageChangedEvent: any = '';
    public croppedImage: any = '';

    public ngOnInit(): void {
        console.log('file', this.file);

    }

    public imageCropped(event: ImageCroppedEvent): void {
        this.croppedImage = event.base64;
    }

    public imageLoaded(): void {
        // show cropper
    }

    public cropperReady(): void {
        // cropper ready
    }

    public loadImageFailed(): void {
        // show message
    }
}
