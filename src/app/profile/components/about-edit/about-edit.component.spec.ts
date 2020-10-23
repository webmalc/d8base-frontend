import {HttpClientTestingModule} from '@angular/common/http/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {StorageManagerService} from '../../../core/proxies/storage-manager.service';
import {StorageManagerMock} from '../../../core/services/token-manager.service.spec';
import {SelectableCountryOnSearchService} from '../../../shared/services/selectable-country-on-search.service';
import {SavedProfessionalApiService} from '../../services/saved-professional-api.service';
import {AboutEditComponent} from './about-edit.component';

describe('AboutEditComponent', () => {
    let component: AboutEditComponent;
    let fixture: ComponentFixture<AboutEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AboutEditComponent],
            imports: [IonicModule.forRoot(), HttpClientTestingModule, ReactiveFormsModule, FormsModule],
            providers: [
                SelectableCountryOnSearchService,
                FormBuilder,
                SavedProfessionalApiService,
                {provide: StorageManagerService, useClass: StorageManagerMock}
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
