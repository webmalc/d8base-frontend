import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistrationService } from '@app/auth/services/registration.service';
import { OrderWizardStateService } from '@app/order/services';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';

import { ClientIdentificationComponent } from './client-identification.component';

describe('ClientIdentificationComponent', () => {
  let component: ClientIdentificationComponent;
  let fixture: ComponentFixture<ClientIdentificationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClientIdentificationComponent],
        imports: [
          IonicModule.forRoot(),
          IonicStorageModule.forRoot(),
          TranslateModule.forRoot(),
          HttpClientTestingModule,
          RouterTestingModule,
        ],
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
