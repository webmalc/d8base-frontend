import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {StorageManagerService} from '../../../core/proxies/storage-manager.service';
import {StorageManagerMock} from '../../../core/services/token-manager.service.spec';
import {CertificatesApiService} from '../../services/certificates-api.service';
import {MasterCertificateEditPage} from './master-certificate-edit.page';

describe('MasterCertificateEditPage', () => {
    let component: MasterCertificateEditPage;
    let fixture: ComponentFixture<MasterCertificateEditPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MasterCertificateEditPage],
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
                {provide: StorageManagerService, useClass: StorageManagerMock},
                CertificatesApiService
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MasterCertificateEditPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
