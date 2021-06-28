import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgDestroyService } from '@app/core/services';

interface ImageControlDiff {
  add: string[];
  remove: number[];
}

@Component({
  selector: 'app-images-control',
  templateUrl: './images-control.component.html',
  styleUrls: ['./images-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImagesControlComponent),
      multi: true,
    },
    NgDestroyService,
  ],
})
export class ImagesControlComponent implements ControlValueAccessor, OnInit {
  public imageControlDiff: ImageControlDiff = { add: [], remove: [] };
  public photos: string[];
  public initialPhotos: string[];

  private onChange: (value: any) => void;
  private onTouched: () => void;

  constructor(private readonly destroy$: NgDestroyService) {}

  public ngOnInit(): void {}

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public writeValue(photos: string[]): void {
    this.initialPhotos = this.photos = photos;
  }

  public async onSelect(files: File[]): Promise<void> {}

  public onRemove(index: number): void {
    // this.files = [...this.files.slice(0, index), ...this.files.slice(index + 1)];
  }
}
