import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormBuilder} from '@angular/forms';
import {SelectableCountryOnSearchService} from '../../../shared/services/selectable-country-on-search.service';
import { AboutEditComponent } from './about-edit.component';

describe('AboutEditComponent', () => {
    let component: AboutEditComponent;
    let fixture: ComponentFixture<AboutEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AboutEditComponent ],
            imports: [IonicModule.forRoot(), HttpClientTestingModule],
            providers: [
                SelectableCountryOnSearchService,
                FormBuilder
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AboutEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
