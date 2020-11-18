import {Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FileService} from '@app/shared/services/file.service';
import {PhotoService} from '@app/shared/services/photo.service';
import {CameraPhoto} from '@capacitor/core';
import {IonInput, Platform} from '@ionic/angular';

@Component({
    selector: 'app-picture-selector',
    templateUrl: './picture-selector.component.html',
    styleUrls: ['./picture-selector.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PictureSelectorComponent),
        multi: true
    }]
})
export class PictureSelectorComponent implements ControlValueAccessor {

    @Input() public camera: boolean = true;
    @Input() public fileSystem: boolean = true;
    @ViewChild('file', {read: ElementRef}) public fileInput: ElementRef<IonInput>;
    @Output() public value: EventEmitter<string> = new EventEmitter<string>();

    public uri: string | null;
    private onChange: (fn: any) => void;

    constructor(
        public platform: Platform,
        private readonly photoService: PhotoService,
        private readonly fileService: FileService
    ) {
    }

    public async openAndSelectFile(): Promise<void> {
        const input: HTMLInputElement = await this.fileInput.nativeElement.getInputElement();
        input.click();
    }

    public async onFileSelected(): Promise<void> {
        const input: HTMLInputElement = await this.fileInput.nativeElement.getInputElement();
        await this.readBaseAndSetUri(input.files.item(0) as File);
    }

    public async createCameraSnap(): Promise<void> {
        let oldUri: string;
        try {
            oldUri = this.uri;
            this.clearUri();
            const cameraPhoto: CameraPhoto = await this.photoService.createPhoto();
            const blob = await fetch(cameraPhoto.webPath).then(r => r.blob());
            await this.readBaseAndSetUri(blob);
        } catch (error) {
            this.setUri(oldUri);
        }
    }

    public async getImageFile(): Promise<void> {
        let oldUri: string;
        try {
            oldUri = this.uri;
            this.clearUri();
            const file = await this.fileService.getFile();
            await this.readBaseAndSetUri(file);
        } catch (error) {
            this.setUri(oldUri);
        }

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

    private readBaseAndSetUri(file: Blob | File): Promise<null> {
        return new Promise<null>(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.setUri(reader.result as string);
                resolve();
            };
        });
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
