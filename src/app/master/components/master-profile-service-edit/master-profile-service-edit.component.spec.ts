import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Price} from '@app/service/models/price';
import {Service} from '@app/service/models/service';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {MasterProfileServiceEditComponent} from './master-profile-service-edit.component';

describe('MasterProfileServiceEditComponent', () => {
    let component: MasterProfileServiceEditComponent;
    let fixture: ComponentFixture<MasterProfileServiceEditComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MasterProfileServiceEditComponent],
            imports: [
                IonicModule.forRoot(),
                TranslateModule.forRoot(),
                RouterTestingModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MasterProfileServiceEditComponent);
        component = fixture.componentInstance;
        const service = new Service();
        service.price = new Price();
        service.price.is_price_fixed = true;
        service.price.price = '100';
        component.service = service;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
