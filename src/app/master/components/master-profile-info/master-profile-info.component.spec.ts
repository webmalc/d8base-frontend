import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {StorageManagerMock} from 'src/testing/mocks';
import {CertificatesApiService} from '../../services/certificates-api.service';
import {EducationApiService} from '../../services/education-api.service';
import {ExperienceApiService} from '../../services/experience-api.service';
import {MasterProfileInfoGeneratorFactoryService} from '../../services/master-profile-info-generator-factory.service';
import {ReviewsReadonlyApiService} from '../../services/reviews-readonly-api.service';
import {MasterProfileInfoComponent} from './master-profile-info.component';

describe('MasterProfileInfoComponent', () => {
    let component: MasterProfileInfoComponent;
    let fixture: ComponentFixture<MasterProfileInfoComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MasterProfileInfoComponent],
            imports: [IonicModule.forRoot(), HttpClientTestingModule, TranslateModule.forRoot()],
            providers: [
                MasterProfileInfoGeneratorFactoryService,
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            paramMap: {
                                get(): string {
                                    return '';
                                }
                            }
                        }
                    }
                },
                ExperienceApiService,
                EducationApiService,
                CertificatesApiService,
                ReviewsReadonlyApiService,
                {provide: StorageManagerService, useClass: StorageManagerMock}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MasterProfileInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
