import {Component, forwardRef, Input, Provider} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {PhotoService} from '@app/shared/services/photo.service';

const VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PictureSelectorComponent),
    multi: true
};

@Component({
    selector: 'app-picture-selector',
    templateUrl: './picture-selector.component.html',
    styleUrls: ['./picture-selector.component.scss'],
    providers: [VALUE_ACCESSOR]
})
export class PictureSelectorComponent implements ControlValueAccessor {

    @Input() public camera: boolean = true;
    @Input() public fileSystem: boolean = true;

    private uri: string;

    private onChange: (fn: any) => void;

    constructor(private photoService: PhotoService) {
    }

    public async createPhoto(): Promise<void> {
        const photo = await this.photoService.createPhoto();
        this.setUri(photo.webPath);
    }
    // public async getImageFile(): Promise<void> {
    //
    // }

    public setUri(uri: string): void {
        this.uri = uri;
        this.onChange(this.uri);
    }

    public registerOnChange(fn: any): void {
        // this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }

    public setDisabledState(isDisabled: boolean): void {
    }

    public writeValue(uri: string): void {
        this.uri = uri;
    }


}
