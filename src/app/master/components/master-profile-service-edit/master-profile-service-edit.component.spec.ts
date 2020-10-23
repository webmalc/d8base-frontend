import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {Price} from '../../../service/models/price';
import {Service} from '../../../service/models/service';
import {MasterProfileServiceEditComponent} from './master-profile-service-edit.component';

describe('MasterProfileServiceEditComponent', () => {
    let component: MasterProfileServiceEditComponent;
    let fixture: ComponentFixture<MasterProfileServiceEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MasterProfileServiceEditComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(MasterProfileServiceEditComponent);
        component = fixture.componentInstance;
        const service = new Service();
        service.price = new Price();
        service.price.is_price_fixed = true;
        service.price.price = 100;
        component.service = service;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
