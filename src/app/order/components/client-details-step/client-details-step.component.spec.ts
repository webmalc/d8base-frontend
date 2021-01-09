import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderWizardStateService } from '@app/order/services/order-wizard-state.service';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';
import { UserManagerService } from '../../../core/services/user-manager.service';

import { ClientDetailsStepComponent } from './client-details-step.component';

describe('ClientDetailsStepComponent', () => {
    let component: ClientDetailsStepComponent;
    let fixture: ComponentFixture<ClientDetailsStepComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ClientDetailsStepComponent],
                imports: [
                    IonicModule.forRoot(),
                    TranslateModule.forRoot(),
                    RouterTestingModule,
                    IonicStorageModule.forRoot(),
                    HttpClientTestingModule,
                ],
                providers: [
                    OrderWizardStateService,
                    UserManagerService,
                    FormBuilder,
                    ChangeDetectorRef,
                ],
            }).compileComponents();

            fixture = TestBed.createComponent(ClientDetailsStepComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        }),
    );

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
