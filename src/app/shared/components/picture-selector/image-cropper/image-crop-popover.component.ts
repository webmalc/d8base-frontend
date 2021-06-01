import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ImageCroppedEvent } from 'ngx-image-cropper';

const AVATAR_SIZE_PX = 512;

@Component({
  selector: 'app-image-crop-popover',
  templateUrl: './image-crop-popover.component.html',
  styleUrls: ['./image-crop-popover.component.scss'],
})
export class ImageCropPopoverComponent {
  @Input() public image: File = null;
  @Input() public callback: (data: string) => void;

  // use jpeg format by default to minimize sent data size
  public format: 'png' | 'jpeg' | 'webp' | 'bmp' | 'ico' = 'jpeg';
  public avatarSize: number = AVATAR_SIZE_PX;

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
