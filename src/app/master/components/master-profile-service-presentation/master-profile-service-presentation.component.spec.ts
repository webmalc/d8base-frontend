import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {Price} from '../../../service/models/price';
import {Service} from '../../../service/models/service';
import {MasterProfileServicePresentationComponent} from './master-profile-service-presentation.component';

describe('MasterProfileServicePresentationComponent', () => {
    let component: MasterProfileServicePresentationComponent;
    let fixture: ComponentFixture<MasterProfileServicePresentationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MasterProfileServicePresentationComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(MasterProfileServicePresentationComponent);
        component = fixture.componentInstance;
        const service = new Service();
        service.price = new Price();
        service.price.is_price_fixed = true;
        service.price.price = 100;
        component.serviceData = {service};
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
