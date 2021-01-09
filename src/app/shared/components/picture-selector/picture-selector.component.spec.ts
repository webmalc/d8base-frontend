import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, fakeAsync, inject, TestBed} from '@angular/core/testing';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {ProfileFormFields} from '@app/profile/enums/profile-form-fields';
import {CameraPhoto} from '@capacitor/core';
import {IonButtons, IonicModule} from '@ionic/angular';
import {FileService} from '../../services/file.service';
import {PhotoService} from '../../services/photo.service';
import {PictureSelectorComponent} from './picture-selector.component';

const initURI: string = 'https://picture0.example.com' as const;

@Component({
    selector: 'app-test-picture-selector',
    template: `
        <div [formGroup]="form">
            <app-picture-selector formControlName="avatar" [camera]="true" [fileSystem]="true"></app-picture-selector>
        </div>`,
})
class AppTestFormControlComponent {
    public form: FormGroup = new FormGroup({
        avatar: new FormControl(initURI),
    });
}

describe('PictureSelectorComponent', () => {

    let wrapperComponent: AppTestFormControlComponent;
    let wrapperFixture: ComponentFixture<AppTestFormControlComponent>;
    let component: PictureSelectorComponent;
    let componentDebugElement: DebugElement;
    let photoService: PhotoService;
    let fileService: FileService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PictureSelectorComponent, AppTestFormControlComponent],
            imports: [IonicModule, ReactiveFormsModule],
        });
        wrapperFixture = TestBed.createComponent(AppTestFormControlComponent);
        wrapperComponent = wrapperFixture.componentInstance;
        componentDebugElement = wrapperFixture.debugElement.query(By.directive(PictureSelectorComponent));
        component = componentDebugElement.componentInstance;
        wrapperFixture.detectChanges();
    });

    beforeEach(inject([PhotoService, FileService], (ps, fs) => {
        photoService = ps;
        fileService = fs;
    }));

    it('should create', () => {
        expect(wrapperComponent).toBeTruthy();
        expect(component).toBeTruthy();
    });

    // TODO: update deprecated test
    xit('should trigger click and pass base 64 format of picture created by createCameraSnap', async () => {
        expect(wrapperComponent.form.get('avatar').value).toBe(initURI);

        const blob = new Blob(['someText']);
        const webPath = URL.createObjectURL(blob);
        const promise = new Promise<CameraPhoto>(resolve => {
            resolve({webPath, format: 'png'});
        });
        spyOn(photoService, 'createPhoto').and.returnValue(promise);
        await component.createCameraSnap();
        expect(photoService.createPhoto).toHaveBeenCalled();
        expect(wrapperComponent.form.get(ProfileFormFields.Avatar).value).toEqual('data:text/plain;base64,c29tZVRleHQ=');
    });

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

    xit('should be test with input file selector');

    xit('should implement cellphone file selector');

});
