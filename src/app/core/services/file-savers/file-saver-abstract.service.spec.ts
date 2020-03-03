import {async, TestBed} from '@angular/core/testing';

import {CameraPhoto} from '@capacitor/core';
import {of} from 'rxjs';
import {FileSaverService} from './file-saver-abstract.service';
import {fileSaverProvider} from './file-saver-service.provider';
import {image} from './test-image';


describe('FileSaverService', () => {
    let service: FileSaverService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [fileSaverProvider]
        });
        service = TestBed.get(FileSaverService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    it('should take the photo as blob url and call saveFile method with File', async (done) => {
        const fakeFilePath: string = 'fakeFilePath';

        const response = await fetch(image);
        const blob: Blob = await response.blob();
        const photo: CameraPhoto = {
            format: 'jpeg',
            webPath: URL.createObjectURL(blob)
        };

        spyOn(service, 'saveFile').and.returnValue(of(fakeFilePath));
        service.saveCameraPhoto(photo).subscribe(uri => {
            expect(uri).toBe(fakeFilePath);
            expect(service.saveFile).toHaveBeenCalledWith(jasmine.any(File));
            done();
        });

    });

// ** TODO: Test this!
    it('should take file from fileSystem and call method saveFile with File type', () => {
        expect(true).toBeTruthy();
    });
});
