import {async, ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';
import {TranslateModule} from '@ngx-translate/core';
import {plainToClass} from 'class-transformer';
import {of} from 'rxjs';
import {TranslateServiceMock} from '../../../core/mock/translate-service-mock';
import {LocationModel} from '../../../core/models/location.model';
import {IpApiService} from '../../../core/services/location/ip-api.service';
import {IpDataService} from '../../../core/services/location/ip-data.service';
import {IpServicesHolderService} from '../../../core/services/location/ip-services-holder.service';
import {IpnfDataService} from '../../../core/services/location/ipnf-data.service';
import {LocationService} from '../../../core/services/location/location.service';
import {ErrorFlashbagComponent} from '../../../shared/components/error-flashbag/error-flashbag.component';
import {User} from '../../../shared/models/user';
import {RegistrationFormComponent} from '../../components/registration-form/registration-form.component';
import {RegistrationFormService} from '../../forms/registration-form.service';
import {RegistrationService} from '../../services/registration.service';
import {RegistrationPage} from './registration.page';

describe('RegistrationPage', () => {
    let component: RegistrationPage;
    let fixture: ComponentFixture<RegistrationPage>;
    let router: Router;

    beforeEach(async(() => {
        const ipServiceMock = {getData: () => Promise.resolve({
                postalCode: 'testCode',
                countryCode: 'testCountry',
                latitude: 'testLat',
                longitude: 'testLon',
                city: 'testCity'
            })};
        TestBed.configureTestingModule({
            declarations: [RegistrationPage, RegistrationFormComponent, ErrorFlashbagComponent, TranslateServiceMock],
            imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule, RouterTestingModule, TranslateModule],
            providers: [
                RegistrationFormService, FormBuilder, RegistrationService, LocationService, IpServicesHolderService,
                {provide: IpApiService, useValue: ipServiceMock},
                {provide: IpDataService, useValue: ipServiceMock},
                {provide: IpnfDataService, useValue: ipServiceMock},
                {provide: HttpClient, useValue: {post: () => of(true)}},
                {provide: Geolocation, useValue: {getCurrentPosition: () => 'test' }},
                {provide: LocationAccuracy, useValue: {canRequest: () => true, REQUEST_PRIORITY_HIGH_ACCURACY: 'test'}}
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
        const user = {
            email: 'test@test.te',
            password: 'test',
            firstName: 'test'
        };
        const location = {
            country: 'testCountry',
            city: 'testCity'
        };

        component.onSubmitRegistrationForm({
            user: plainToClass(User, user, { excludeExtraneousValues: true }),
            location: plainToClass(LocationModel, location, { excludeExtraneousValues: true })
        });
        flush();

        expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/login');
    }));
});

// ** TODO: Need to title test
