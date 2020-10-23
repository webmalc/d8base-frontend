import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {StorageManagerMock} from 'src/testing/mocks';
import {StorageManagerService} from '../../../core/proxies/storage-manager.service';
import {MasterPickerPopoverComponent} from './master-picker-popover.component';

describe('MasterPickerPopoverComponent', () => {
    let component: MasterPickerPopoverComponent;
    let fixture: ComponentFixture<MasterPickerPopoverComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MasterPickerPopoverComponent],
            imports: [IonicModule.forRoot(), HttpClientTestingModule],
            providers: [
                {provide: StorageManagerService, useClass: StorageManagerMock}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MasterPickerPopoverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
