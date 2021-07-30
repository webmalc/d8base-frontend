import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fileToBase64 } from '@app/core/functions/media.functions';
import { ToastService } from '@app/core/services';
import { PopoverController } from '@ionic/angular';
import { ImageCropPopoverComponent } from './image-cropper/image-crop-popover.component';

// max unprocessed file size in bytes
// has to be big enough to accommodate images from a hi-res camera
const MAX_SIZE = 5000000;

@Component({
  selector: 'app-picture-selector',
  templateUrl: './picture-selector.component.html',
  styleUrls: ['./picture-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PictureSelectorComponent),
      multi: true,
    },
  ],
})
export class PictureSelectorComponent implements ControlValueAccessor {
  @Input() public disabled: boolean = false;
  @Input() public cropAfterSelect: boolean = false;

  public uri: string | null;

  private onChange: (fn: any) => void;
  private onTouched: (fn: any) => void;

  constructor(private readonly toastService: ToastService, private readonly popoverController: PopoverController) {}

  public onFileSelected(event: Event) {
    const file: File = (event.target as HTMLInputElement).files[0];
    if (!file) {
      return;
    }
    if (file.size > MAX_SIZE) {
      this.toastService.showError('client-errors.file-is-too-big', { translate: true });
      return;
    }
    if (this.cropAfterSelect) {
      this.cropAndSave(file);
    } else {
      this.save(file);
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(uri: string): void {
    this.uri = uri;
  }

  public onDelete(): void {
    this.clearUri();
  }

  private save(image: File) {
    fileToBase64(image).then(base64 => {
      this.setUri(base64);
    });
  }

  private async cropAndSave(image: File): Promise<void> {
    const callback = (base64: string) => {
      this.setUri(base64);
    };
    const popover = await this.popoverController.create({
      component: ImageCropPopoverComponent,
      componentProps: {
        image,
        callback,
      },
      cssClass: 'popover-big',
    });
    await popover.present();
  }

  private clearUri(): void {
    this.setUri('');
  }

  private setUri(uri: string): void {
    this.uri = uri;
    this.onChange(uri);
  }
}
