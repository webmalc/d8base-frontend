import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-crop-popover',
  templateUrl: './image-crop-popover.component.html',
  styleUrls: ['./image-crop-popover.component.scss'],
})
export class ImageCropPopoverComponent {
  @Input() public image: Blob = null;
  @Input() public callback: (data: string) => void;

  private croppedImage: string;

  constructor(private readonly popoverController: PopoverController) {}

  public save(): void {
    this.callback(this.croppedImage);
    this.popoverController.dismiss();
  }

  public onImageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  public onLoadFailed(): void {
    // TODO: show error message
  }
}
