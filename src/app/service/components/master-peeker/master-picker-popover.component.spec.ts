import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {IonicModule} from '@ionic/angular';
import {StorageManagerMock} from 'src/testing/mocks';
import {MasterPickerPopoverComponent} from './master-picker-popover.component';

describe('MasterPickerPopoverComponent', () => {
    let component: MasterPickerPopoverComponent;
    let fixture: ComponentFixture<MasterPickerPopoverComponent>;

    beforeEach(waitForAsync(() => {
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
