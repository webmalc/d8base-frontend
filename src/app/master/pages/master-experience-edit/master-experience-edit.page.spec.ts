import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {StorageManagerService} from '@app/core/proxies/storage-manager.service';
import {IonicModule} from '@ionic/angular';
import {StorageManagerMock} from 'src/testing/mocks';
import {ExperienceApiService} from '../../services/experience-api.service';
import {MasterExperienceEditPage} from './master-experience-edit.page';

describe('MasterExperienceEditPage', () => {
    let component: MasterExperienceEditPage;
    let fixture: ComponentFixture<MasterExperienceEditPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MasterExperienceEditPage],
            imports: [IonicModule.forRoot(), HttpClientTestingModule],
            providers: [
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            paramMap: {
                                get(): string {
                                    return '';
                                },
                            },
                        },
                    },
                },
                ExperienceApiService,
                {provide: StorageManagerService, useClass: StorageManagerMock},
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MasterExperienceEditPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
