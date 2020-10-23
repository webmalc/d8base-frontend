import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {IonicStorageModule} from '@ionic/storage';
import {TranslateModule} from '@ngx-translate/core';
import {SettingsFormService} from '../../forms/settings-form.service';
import {SettingsTabComponent} from './settings-tab.component';

describe('SettingsTabComponent', () => {
    let component: SettingsTabComponent;
    let fixture: ComponentFixture<SettingsTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SettingsTabComponent],
            imports: [
                IonicModule.forRoot(),
                ReactiveFormsModule,
                HttpClientTestingModule,
                TranslateModule.forRoot(),
                IonicStorageModule.forRoot()
            ],
            providers: [SettingsFormService]
        }).compileComponents();

        fixture = TestBed.createComponent(SettingsTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    xit('should be some tests');
});
