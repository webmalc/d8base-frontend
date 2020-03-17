import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {Form, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ProfileService} from '../../services/profile.service';
import {MainInfoTabComponent} from './main-info-tab.component';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {TranslateModule} from '@ngx-translate/core';
import {ProfileFormService} from '../../forms/profile-form.service';
import {User} from '../../../core/models/user';
import {Injectable} from '@angular/core';
import {UserInterface} from '../../../core/interfaces/user.interface';
import {PictureSelectorComponent} from '../../../shared/components/picture-selector/picture-selector.component';
import {SharedModule} from '../../../shared/shared.module';

@Injectable()
class ProfileServiceStub {
    private user: UserInterface = {
        firstName: 'name',
        lastName: 'name',
        phone: 'sadf',
        password: 'sdf',
        email: 'wer',
        age: 11,
        gender: 'werwer',
        id: 1,
        languages: ['a', 'b'],
        main_language: 'sdf',
        patronymic: 'sdf',
        type_of_user: 'sdf',
        avatar: 'noavatar',

    };

    constructor(private profileFormService: ProfileFormService) {
    }

    public getAvailableAdditionalLanguages$(): BehaviorSubject<string[]> {
        return new BehaviorSubject<string[]>([]);
    }

    public createProfileForm$(): Observable<FormGroup> {
        return of<FormGroup>(this.profileFormService.createForm(this.user));
    }

}

describe('MainInfoTabComponent', () => {

    let component: MainInfoTabComponent;
    let fixture: ComponentFixture<MainInfoTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MainInfoTabComponent, PictureSelectorComponent],
            providers: [
                ProfileFormService,
                {
                    provide: ProfileService,
                    useClass: ProfileServiceStub,
                }
            ],
            imports: [IonicModule.forRoot(), ReactiveFormsModule, TranslateModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(MainInfoTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
