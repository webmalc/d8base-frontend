import {Component, forwardRef, Inject, Input, Provider} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FileService} from '@app/shared/services/file.service';
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
    providers: [
        VALUE_ACCESSOR,
    ]
})
export class PictureSelectorComponent implements ControlValueAccessor {

    @Input() public camera: boolean = true;
    @Input() public fileSystem: boolean = true;

    public uri: string;

    private onChange: (fn: any) => void;

    constructor(
        private photoService: PhotoService,
        private fileService: FileService,
    ) {
    }

    public async createPhoto(): Promise<void> {
        const photo = await this.photoService.createPhoto();
        this.setUri(this.saveFile(photo.webPath));
    }

    public async getImageFile(): Promise<void> {
        const file = await this.fileService.getFile();
        this.setUri(this.saveFile(file));
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }

    public setDisabledState(isDisabled: boolean): void {
    }

    public writeValue(uri: string): void {
        this.uri = uri;
    }

    private setUri(uri: string): void {
        this.uri = uri;
        this.onChange(this.uri);
    }

    private saveFile(blob: string): string {
        return blob;
        // return this.saveService.save(blob);
    }


}
