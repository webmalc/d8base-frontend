import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {plainToClass} from 'class-transformer';

import {LocationModel} from '../../../core/models/location.model';
import {ErrorFlashbagComponent} from '../../../shared/components/error-flashbag/error-flashbag.component';
import {User} from '../../../core/models/user';
import {RegistrationFormFields} from '../../enums/registration-form-fields';
import {RegistrationFormService} from '../../forms/registration-form.service';
import {RegistrationFormComponent} from './registration-form.component';

describe('RegistrationFormComponent', () => {
    let component: RegistrationFormComponent;
    let fixture: ComponentFixture<RegistrationFormComponent>;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegistrationFormComponent, ErrorFlashbagComponent],
            imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule, RouterTestingModule, TranslateModule.forRoot()],
            providers: [RegistrationFormService]
        }).compileComponents();

        router = TestBed.get(Router);
        spyOn(router, 'navigateByUrl');

        fixture = TestBed.createComponent(RegistrationFormComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('test submit registration form', () => {
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
            country: ''
        };

        expect((component as any).registrationFormData.emit)
            .toHaveBeenCalledWith(
                {
                    user: plainToClass(User, data, { excludeExtraneousValues: true }),
                    location: plainToClass(LocationModel, data, { excludeExtraneousValues: true })
                });
    });
});
