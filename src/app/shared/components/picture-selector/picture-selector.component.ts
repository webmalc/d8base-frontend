import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fileToBase64 } from '@app/core/functions/file.functions';
import { PopoverController } from '@ionic/angular';
import { ImageCropPopoverComponent } from './image-cropper/image-crop-popover.component';

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
  @Input() public cropAfterSelect: boolean = true;
  @Output() public value: EventEmitter<string> = new EventEmitter<string>();

  public uri: string | null;
  private onChange: (fn: any) => void;

  constructor(
    private readonly popoverController: PopoverController,
  ) {}

  public onFileSelected(event: Event): Promise<void> {
    const file: File = (event.target as HTMLInputElement).files[0];
    if (!file) {
      return Promise.reject();
    }
    if (!this.cropAfterSelect) {
      fileToBase64(file).then((base64) => {
        this.setUri(base64);
      });
      return Promise.resolve();
     }
    return this.cropAndSave(file);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    // can't be disabled
  }

  public setDisabledState(isDisabled: boolean): void {
    // can't be disabled
  }

  public writeValue(uri: string): void {
    this.uri = uri;
  }

  public onDelete(): void {
    this.clearUri();
  }

  private async cropAndSave(image: Blob): Promise<void> {
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
    this.value.emit(uri);
  }
}
