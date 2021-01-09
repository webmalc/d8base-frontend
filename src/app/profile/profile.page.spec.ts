import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {MasterManagerService} from '@app/core/services';
import {ProfileService} from '@app/profile/services/profile.service';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {BehaviorSubject} from 'rxjs';
import {StorageManagerMock} from '../../testing/mocks';
import {ProfilePage} from './profile.page';

class MasterManagerServiceStub {
    public isMaster$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}

describe('ProfilePage', () => {
    let component: ProfilePage;
    let fixture: ComponentFixture<ProfilePage>;
    let masterService;

    beforeEach(waitForAsync(() => {
        masterService = jasmine.createSpyObj('MasterManagerService', ['isMaster']);
        TestBed.configureTestingModule({
            declarations: [ProfilePage],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                TranslateModule.forRoot(),
                HttpClientTestingModule,
                ReactiveFormsModule,
                FormsModule,
            ],
            providers: [
                {
                    provide: MasterManagerService,
                    useClass: MasterManagerServiceStub,
                },
                ProfileService,
                {provide: StorageManagerService, useClass: StorageManagerMock},
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ProfilePage);
        component = fixture.componentInstance;
        masterService = TestBed.inject(MasterManagerService);
    }));
    it('should create', () => {
        expect(component).toBeDefined();
    });
});
