import {CommonModule} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {User} from '@app/core/models/user';
import {UserLocation} from '@app/core/models/user-location';
import {IpApiService} from '@app/core/services/location/ip-api.service';
import {IpDataService} from '@app/core/services/location/ip-data.service';
import {IpServicesHolderService} from '@app/core/services/location/ip-services-holder.service';
import {IpnfDataService} from '@app/core/services/location/ipnf-data.service';
import {ErrorFlashbagComponent} from '@app/shared/components/error-flashbag/error-flashbag.component';
import {SelectableCityOnSearchService} from '@app/shared/services/selectable-city-on-search.service';
import {SelectableCountryOnSearchService} from '@app/shared/services/selectable-country-on-search.service';
// https://github.com/angular/angularfire/issues/1259#issuecomment-549745894
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {plainToClass} from 'class-transformer';
import {IonicSelectableModule} from 'ionic-selectable';
import {RegistrationFormFields} from '../../enums/registration-form-fields';
import {RegistrationFormService} from '../../forms/registration-form.service';
import {CityPickerPopoverComponent} from '../city-picker-popover/city-picker-popover.component';
import {RegistrationFormComponent} from './registration-form.component';

describe('RegistrationFormComponent', () => {
    let component: RegistrationFormComponent;
    let fixture: ComponentFixture<RegistrationFormComponent>;
    let router: Router;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                RegistrationFormComponent,
                ErrorFlashbagComponent,
                CityPickerPopoverComponent,
            ],
            imports: [
                IonicModule.forRoot(),
                ReactiveFormsModule,
                FormsModule,
                RouterTestingModule,
                TranslateModule.forRoot(),
                HttpClientTestingModule,
                CommonModule,
                IonicSelectableModule,
            ],
            providers: [
                RegistrationFormService,
                IpServicesHolderService,
                IpApiService,
                IpDataService,
                IpnfDataService,
                LocationAccuracy,
                Geolocation,
                SelectableCountryOnSearchService,
                SelectableCityOnSearchService,
            ],
        }).compileComponents();

        router = TestBed.inject(Router);
        spyOn(router, 'navigateByUrl');

        fixture = TestBed.createComponent(RegistrationFormComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    xit('test submit registration form', () => {
        const email = (component as any).registrationFormService.form.controls[RegistrationFormFields.Email];
        const pwd = (component as any).registrationFormService.form.controls[RegistrationFormFields.Password];

        email.setValue('test@test.te');
        pwd.setValue('test');

        spyOn((component as any).registrationFormData, 'emit');

        fixture.debugElement.nativeElement.querySelector('ion-button').click();

        const data = {
            email: 'test@test.te',
            password: 'test',
            firstName: '',
            phone: '',
            city: '',
            country: '',
        };

        expect((component as any).registrationFormData.emit)
            .toHaveBeenCalledWith(
                {
                    user: plainToClass(User, data, {excludeExtraneousValues: true}),
                    location: plainToClass(UserLocation, data, {excludeExtraneousValues: true}),
                });
    });
});
