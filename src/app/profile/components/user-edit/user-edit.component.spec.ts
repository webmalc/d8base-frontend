import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { IonicModule } from '@ionic/angular';
import { StorageManagerMock } from 'src/testing/mocks';
import { ProfileService } from '../../services/profile.service';
import { RegisterEmailApiService } from '../../services/register-email-api.service';
import { UserEditComponent } from './user-edit.component';

describe('UserEditComponent', () => {
    let component: UserEditComponent;
    let fixture: ComponentFixture<UserEditComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [UserEditComponent],
            imports: [IonicModule.forRoot(), HttpClientTestingModule],
            providers: [
                ProfileService,
                Location,
                FormBuilder,
                RegisterEmailApiService,
                { provide: StorageManagerService, useClass: StorageManagerMock},
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(UserEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
