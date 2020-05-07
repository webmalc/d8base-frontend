import {Component, ElementRef, forwardRef, Input, Provider, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FileSaverService} from '@app/core/services/file-savers/file-saver-abstract.service';
import {fileSaverProvider} from '@app/core/services/file-savers/file-saver-service.provider';
import {FileService} from '@app/shared/services/file.service';
import {PhotoService} from '@app/shared/services/photo.service';
import {CameraPhoto} from '@capacitor/core';
import {IonInput, Platform} from '@ionic/angular';

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
    @ViewChild('file', { read: ElementRef }) public fileInput: ElementRef<IonInput>;

    public uri: string | null;
    private onChange: (fn: any) => void;

    constructor(
        private photoService: PhotoService,
        private fileService: FileService,
        private fileSaver: FileSaverService,
        public platform: Platform
    ) {
    }

    public inputClick(): void {
        this.fileInput.nativeElement.getInputElement().then(
            (res: HTMLInputElement) => res.click()
        );
    }

    public fileOnChange(): void {
        this.fileInput.nativeElement.getInputElement().then(
            (res: HTMLInputElement) => {
                const reader = new FileReader();
                reader.readAsDataURL(res.files.item(0) as File);
                reader.onload = () => {
                    this.setUri(reader.result as string);
                };
            }
        );
    }

    public async createPhoto(): Promise<void> {
        let oldUri: string;
        try {
            oldUri = this.uri;
            this.clearUri();
            const cameraPhoto: CameraPhoto = await this.photoService.createPhoto();
            this.fileSaver.saveCameraPhoto(cameraPhoto).subscribe(
                uri => this.setUri(uri)
            );
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
            this.fileSaver.saveFileSystemFile(file).subscribe(
                (uri) => this.setUri(uri)
            );
        } catch (error) {
            this.setUri(oldUri);
        }

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

    private clearUri(): void {
        this.setUri('');
    }

    private setUri(uri: string): void {
        this.uri = uri;
        this.onChange(uri);
    }

    // private getImageDesktopStyle(): void {
    //     const browserFileSelectorFactory = this.resolver.resolveComponentFactory(BrowserFileSelectorComponent);
    //     const component = browserFileSelectorFactory.create(this.injector);
    //     this.refDirective.containerRef.clear();
    //     const componentRef = this.refDirective.containerRef.createComponent(browserFileSelectorFactory);
    //     // componentRef.instance.open();
    //     this.fileSelectSubscription = component.instance.selected.subscribe(
    //         data => this.setUri(data)
    //     );
    // }
    //
    // private async getImageCellPhoneStyle(): Promise<void> {
    //     let oldUri: string;
    //     try {
    //         oldUri = this.uri;
    //         this.clearUri();
    //         // TODO: Use platform depended fileService
    //         const file = await this.fileService.getFile();
    //         this.fileSaver.saveFileSystemFile(file).subscribe(
    //             (uri) => this.setUri(uri)
    //         );
    //     } catch (error) {
    //         this.setUri(oldUri);
    //     }
    // }

}
