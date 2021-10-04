import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegistrationService } from '@app/auth/pages/registration/services/registration.service';
import { OrderWizardStateService } from '@app/order/services';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { ClientIdentificationComponent } from './client-identification.component';

describe('ClientIdentificationComponent', () => {
  let component: ClientIdentificationComponent;
  let fixture: ComponentFixture<ClientIdentificationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientIdentificationComponent],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [OrderWizardStateService, RegistrationService, Geolocation, LocationAccuracy],
      }).compileComponents();

      fixture = TestBed.createComponent(ClientIdentificationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
