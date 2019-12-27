import {async, ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistrationPage } from './registration.page';
import {RegistrationFormComponent} from '../../registration-form/registration-form.component';
import {ErrorFlashbagComponent} from '../../../../../shared/components/error-flashbag/error-flashbag.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {RegistrationFormService} from '../../../forms/registration-form.service';
import {Router} from '@angular/router';
import {RegistrationService} from '../../../services/registration.service';
import {HttpClient} from '@angular/common/http';
import {LocationService} from '../../../services/location/location.service';
import {IpServicesHolderService} from '../../../services/location/ip-services-holder.service';
import {IpApiService} from '../../../services/location/ip-api.service';
import {IpDataService} from '../../../services/location/ip-data.service';
import {IpnfDataService} from '../../../services/location/ipnf-data.service';
import {Observable} from 'rxjs';
import {UserModel} from '../../../../../shared/models/user.model';
import {IpDataInterface} from '../../../interfaces/location/ip-data.interface';

describe('RegistrationPage', () => {
  let component: RegistrationPage;
  let fixture: ComponentFixture<RegistrationPage>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationPage, RegistrationFormComponent, ErrorFlashbagComponent ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [
          RegistrationFormService, FormBuilder, RegistrationService, LocationService, IpServicesHolderService,
          {provide: IpApiService, useClass: IpServiceMock},
          {provide: IpDataService, useClass: IpServiceMock},
          {provide: IpnfDataService, useClass: IpServiceMock},
          {provide: HttpClient, useValue: { post: () => new Observable(subscriber => subscriber.next(true)) }}
      ]
    }).compileComponents();

    router = TestBed.get(Router);
    spyOn(router, 'navigateByUrl');

    fixture = TestBed.createComponent(RegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test nested component exists', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-registration-form')).not.toBe(null);
    expect(compiled.querySelector('app-registration-form ion-input[name="email"]')).not.toBe(null);
    expect(compiled.querySelector('app-registration-form ion-input[name="password"]')).not.toBe(null);
    expect(compiled.querySelector('app-registration-form ion-input[name="confirm"]')).not.toBe(null);
    expect(compiled.querySelector('app-registration-form ion-input[name="name"]')).not.toBe(null);
    expect(compiled.querySelector('app-registration-form ion-input[name="phone"]')).not.toBe(null);
    expect(compiled.querySelector('app-registration-form ion-input[name="country"]')).not.toBe(null);
    expect(compiled.querySelector('app-registration-form ion-input[name="city"]')).not.toBe(null);
  });
  it('test submit form', fakeAsync(() => {
    const user = new UserModel();
    user.email = 'test@test.te';
    user.password = 'test';
    user.name = 'test';

    component.onSubmitRegistrationForm(user);
    flush();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/login');
  }));
});

export class IpServiceMock {
  public getData(): Promise<IpDataInterface> {
    return new Promise<IpDataInterface>((resolve, reject) => {
      resolve({
        ip: 'testIP',
        postal_code: 'testCode',
        country_code: 'testCountry'
      });
    });
  }
}
