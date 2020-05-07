import {ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {IonButtons, IonicModule, Platform} from '@ionic/angular';

import {Component, DebugElement} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {FileSaverService} from '../../../core/services/file-savers/file-saver-abstract.service';
import {FileService} from '../../services/file.service';
import {PhotoService} from '../../services/photo.service';
import {PictureSelectorComponent} from './picture-selector.component';
import {CameraPhoto} from '@capacitor/core';

const initURI: string = 'https://picture0.example.com' as const;

@Component({
    selector: 'app-test-picture-selector',
    template: `
        <div [formGroup]="form">
            <app-picture-selector formControlName="avatar" [camera]="true" [fileSystem]="true"></app-picture-selector>
        </div>`
})
class AppTestFormControlComponent {
    public form: FormGroup = new FormGroup({
        avatar: new FormControl(initURI)
    });
}

describe('PictureSelectorComponent', () => {

    let wrapperComponent: AppTestFormControlComponent;
    let wrapperFixture: ComponentFixture<AppTestFormControlComponent>;
    let component: PictureSelectorComponent;
    let componentDebugElement: DebugElement;
    let photoService: PhotoService;
    let fileService: FileService;
    let fileSaver: FileSaverService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PictureSelectorComponent, AppTestFormControlComponent],
            imports: [IonicModule, ReactiveFormsModule],
            providers: [
                {
                    provide: FileSaverService
                }
            ]
        });
        wrapperFixture = TestBed.createComponent(AppTestFormControlComponent);
        wrapperComponent = wrapperFixture.componentInstance;
        componentDebugElement = wrapperFixture.debugElement.query(By.directive(PictureSelectorComponent));
        component = componentDebugElement.componentInstance;
        wrapperFixture.detectChanges();
        fileSaver = componentDebugElement.injector.get(FileSaverService);
    });

    beforeEach(inject([PhotoService, FileService, FileSaverService], (ps, fs) => {
        photoService = ps;
        fileService = fs;
    }));

    it('should create', () => {
        expect(wrapperComponent).toBeTruthy();
        expect(component).toBeTruthy();
    });

    it('should trigger click and pass saved picture creaetd by createPhoto', fakeAsync(() => {
        expect(wrapperComponent.form.get('avatar').value).toBe(initURI);

        const fakePhotoURI: string = 'http://picture1.example.com';
        spyOn(fileSaver, 'saveCameraPhoto').and.callFake((photo: CameraPhoto): Observable<string> => {
            expect(photo).toBeTruthy();

            return of(photo.webPath);
        });
        spyOn(photoService, 'createPhoto').and.returnValue(Promise.resolve<CameraPhoto>({
            webPath: fakePhotoURI,
            format: 'png'
        }));

        componentDebugElement.query(By.css('#camera-button')).triggerEventHandler('click', {});
        expect(wrapperComponent.form.get('avatar').value).toBe('');
        tick();
        expect(photoService.createPhoto).toHaveBeenCalled();
        expect(fileSaver.saveCameraPhoto).toHaveBeenCalled();
        expect(wrapperComponent.form.get('avatar').value).toBe(fakePhotoURI);
    }));

    it('should trigger click and pass saved picture created by createPhoto or getFile method to formControl', fakeAsync(() => {
        const fakeFileURI: string = 'http://picture2.example.com';
        spyOn(fileSaver, 'saveFileSystemFile').and.callFake((file: string): Observable<string> => {
            expect(file).toBeTruthy();

            return of<string>(fakeFileURI);
        });
        spyOn(fileService, 'getFile').and.returnValue(Promise.resolve(fakeFileURI));
        componentDebugElement.query(By.css('#file-button')).triggerEventHandler('click', {});
        expect(wrapperComponent.form.get('avatar').value).toBe('');
        tick();
        expect(fileService.getFile).toHaveBeenCalled();
        expect(wrapperComponent.form.get('avatar').value).toBe(fakeFileURI);

    }));

    it('should show/hide buttons because component vars state', () => {
        let buttons: DebugElement[];
        const checkExpected = (expectedNum: number): void => {
            buttons = componentDebugElement.query(By.directive(IonButtons)).children;
            expect(buttons.length).toBe(expectedNum);
        };
        component.fileSystem = false;
        wrapperFixture.detectChanges();
        checkExpected(1);

        component.camera = false;
        wrapperFixture.detectChanges();
        checkExpected(0);

        component.fileSystem = true;
        component.camera = true;
        wrapperFixture.detectChanges();
        checkExpected(2);
    });

    it('should bring the old picture back to form, when one of image services throw error', fakeAsync(() => {
        expect(wrapperComponent.form.get('avatar').value).toBe(initURI);
        spyOn(photoService, 'createPhoto').and.throwError('Canceled by user');
        componentDebugElement.query(By.css('#camera-button')).triggerEventHandler('click', {});
        expect(wrapperComponent.form.get('avatar').value).toBe(initURI);
        spyOn(fileService, 'getFile').and.throwError('Some error');
        componentDebugElement.query(By.css('#file-button')).triggerEventHandler('click', {});
        expect(wrapperComponent.form.get('avatar').value).toBe(initURI);
    }));

});
