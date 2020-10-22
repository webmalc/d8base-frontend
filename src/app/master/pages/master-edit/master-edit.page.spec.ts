import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicModule} from '@ionic/angular';
import {StorageManagerMock} from 'src/testing/mocks';
import {StorageManagerService} from '../../../core/proxies/storage-manager.service';
import {MasterEditPage} from './master-edit.page';

describe('MasterEditPage', () => {
    let component: MasterEditPage;
    let fixture: ComponentFixture<MasterEditPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MasterEditPage],
            imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
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

        fixture = TestBed.createComponent(MasterEditPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
