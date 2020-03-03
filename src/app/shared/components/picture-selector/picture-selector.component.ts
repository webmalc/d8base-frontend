import {Component, forwardRef, Inject, Input, Provider} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FileSaverInterface} from '@app/core/interfaces/file-saver.interface';
import {AwsFileSaverService} from '@app/core/services/file-savers/aws-file-saver.service';
import {FileSaverService} from '@app/core/services/file-savers/file-saver-abstract.service';
import {fileSaverProvider} from '@app/core/services/file-savers/file-saver-service.provider';
import {FileService} from '@app/shared/services/file.service';
import {PhotoService} from '@app/shared/services/photo.service';
import {Observable} from 'rxjs';

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
        fileSaverProvider
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
        private fileSaver: FileSaverService
    ) {
    }

    public async createPhoto(): Promise<void> {
        const cameraPhoto = await this.photoService.createPhoto();
        this.fileSaver.saveCameraPhoto(cameraPhoto).subscribe(
            (uri) => this.setUri(uri)
        );
    }

    public async getImageFile(): Promise<void> {
        const file = await this.fileService.getFile();
        this.fileSaver.saveFileSystemFile(file).subscribe(
            (uri) => this.setUri(uri)
        );
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


}
