import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {StorageManagerMock} from 'src/testing/mocks';
import {StorageManagerService} from '../../../core/proxies/storage-manager.service';
import {MasterLocationEditPage} from './master-location-edit.page';

describe('MasterLocationEditPage', () => {
    let component: MasterLocationEditPage;
    let fixture: ComponentFixture<MasterLocationEditPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MasterLocationEditPage],
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
                {provide: StorageManagerService, useClass: StorageManagerMock}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MasterLocationEditPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
