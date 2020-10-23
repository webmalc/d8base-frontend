import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {StorageManagerService} from '../../../core/proxies/storage-manager.service';
import {StorageManagerMock} from '../../../core/services/token-manager.service.spec';
import {ExperienceApiService} from '../../services/experience-api.service';
import {MasterExperienceEditPage} from './master-experience-edit.page';

describe('MasterExperienceEditPage', () => {
    let component: MasterExperienceEditPage;
    let fixture: ComponentFixture<MasterExperienceEditPage>;

    beforeEach(async(() => {
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
                                }
                            }
                        }
                    }
                },
                ExperienceApiService,
                {provide: StorageManagerService, useClass: StorageManagerMock}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MasterExperienceEditPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
