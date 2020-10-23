import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {MasterEditComponent} from './master-edit.component';

describe('MasterEditComponent', () => {
    let component: MasterEditComponent;
    let fixture: ComponentFixture<MasterEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MasterEditComponent],
            imports: [IonicModule.forRoot(), HttpClientTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(MasterEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
