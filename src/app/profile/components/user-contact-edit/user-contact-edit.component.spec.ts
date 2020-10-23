import {Location} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {of} from 'rxjs';
import {StorageManagerService} from '../../../core/proxies/storage-manager.service';
import {StorageManagerMock} from '../../../core/services/token-manager.service.spec';
import {ContactApiService} from '../../services/contact-api.service';
import {UserContactApiService} from '../../services/user-contact-api.service';
import {UserContactEditComponent} from './user-contact-edit.component';

describe('UserContactEditComponent', () => {
    let component: UserContactEditComponent;
    let fixture: ComponentFixture<UserContactEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserContactEditComponent],
            imports: [IonicModule.forRoot(), HttpClientTestingModule, ReactiveFormsModule, FormsModule],
            providers: [
                UserContactApiService,
                ContactApiService,
                FormBuilder,
                Location,
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            paramMap: {
                                get(): string {
                                    return '';
                                }
                            }
                        }, data: of({isMaster: false})
                    }
                },
                {provide: StorageManagerService, useClass: StorageManagerMock}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UserContactEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
