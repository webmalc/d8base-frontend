import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {of} from 'rxjs';
import {StorageManagerMock} from 'src/testing/mocks';
import {MasterProfileSubmenu} from '../../enums/master-profile-submenu';
import {CertificatesApiService} from '../../services/certificates-api.service';
import {EducationApiService} from '../../services/education-api.service';
import {ExperienceApiService} from '../../services/experience-api.service';
import {ReviewsReadonlyApiService} from '../../services/reviews-readonly-api.service';
import {MasterProfileFactoryComponent} from './master-profile-factory.component';


xdescribe('MasterProfileFactoryComponent', () => {
    let component: MasterProfileFactoryComponent;
    let fixture: ComponentFixture<MasterProfileFactoryComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MasterProfileFactoryComponent],
            imports: [IonicModule.forRoot(), HttpClientTestingModule, TranslateModule.forRoot()],
            providers: [
                ExperienceApiService,
                EducationApiService,
                CertificatesApiService,
                {provide: StorageManagerService, useClass: StorageManagerMock},
                ReviewsReadonlyApiService,
            ],
        });

        fixture = TestBed.createComponent(MasterProfileFactoryComponent);
        component = fixture.componentInstance;
        component.mode = of(MasterProfileSubmenu.Info);
        fixture.detectChanges();
    }));

    it('should create', () => { // TODO: need to pass TranslateModule into dynamically created components
        expect(() => component).toThrow(new Error('unexpected component name'));
    });
});
