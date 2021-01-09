import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {StorageManagerMock} from '../../../../testing/mocks';
import {FlagMenuComponent} from './flag-menu.component';

describe('FlagMenuComponent', () => {
    let component: FlagMenuComponent;
    let fixture: ComponentFixture<FlagMenuComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [FlagMenuComponent],
            imports: [IonicModule.forRoot(), HttpClientTestingModule, TranslateModule.forRoot()],
            providers: [
                {provide: StorageManagerService, useClass: StorageManagerMock},
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(FlagMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
