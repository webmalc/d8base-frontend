import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicModule, IonTabBar} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {BehaviorSubject} from 'rxjs';
import {MasterManagerService} from '../core/services/master-manager.service';
import {ProfilePage} from './profile.page';

class MasterManagerServiceStub {
    public isMaster$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}

describe('ProfilePage', () => {
    let component: ProfilePage;
    let fixture: ComponentFixture<ProfilePage>;
    let masterService;

    beforeEach(async(() => {
        masterService = jasmine.createSpyObj('MasterManagerService', ['isMaster']);
        TestBed.configureTestingModule({
            declarations: [ProfilePage],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule,
                TranslateModule.forRoot()
            ],
            providers: [
                {
                    provide: MasterManagerService,
                    useClass: MasterManagerServiceStub
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProfilePage);
        component = fixture.componentInstance;
        masterService = TestBed.inject(MasterManagerService);
    }));
    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should create tabs', () => {
        const tabs = fixture.debugElement.query(By.directive(IonTabBar)).children;
        expect(tabs.length).toEqual(4);
    });
});
