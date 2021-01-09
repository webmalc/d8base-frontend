import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Price } from '@app/service/models/price';
import { Service } from '@app/service/models/service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MasterProfileServicePresentationComponent } from './master-profile-service-presentation.component';

describe('MasterProfileServicePresentationComponent', () => {
  let component: MasterProfileServicePresentationComponent;
  let fixture: ComponentFixture<MasterProfileServicePresentationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MasterProfileServicePresentationComponent],
      imports: [
        IonicModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MasterProfileServicePresentationComponent);
    component = fixture.componentInstance;
    const service = new Service();
    service.price = new Price();
    service.price.is_price_fixed = true;
    service.price.price = '100';
    component.serviceData = { service };
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
