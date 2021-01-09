import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ImageCropPopoverComponent } from './image-crop-popover.component';

describe('ImageCropperComponent', () => {
    let component: ImageCropPopoverComponent;
    let fixture: ComponentFixture<ImageCropPopoverComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ImageCropPopoverComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                IonicModule.forRoot(),
                TranslateModule.forRoot(),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ImageCropPopoverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
