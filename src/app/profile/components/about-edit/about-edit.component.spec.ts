import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { SelectableCountryOnSearchService } from '@app/shared/services/selectable-country-on-search.service';
import { IonicModule } from '@ionic/angular';
import { Actions, NgxsModule } from '@ngxs/store';
import { InternalActions } from '@ngxs/store/src/actions-stream';
import { StorageManagerMock } from 'src/testing/mocks';
import { SavedProfessionalApiService } from '../../services/saved-professional-api.service';
import { AboutEditComponent } from './about-edit.component';

describe('AboutEditComponent', () => {
  let component: AboutEditComponent;
  let fixture: ComponentFixture<AboutEditComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AboutEditComponent],
        imports: [
          IonicModule.forRoot(),
          HttpClientTestingModule,
          RouterTestingModule,
          ReactiveFormsModule,
          FormsModule,
          NgxsModule.forRoot([]),
        ],
        providers: [
          Actions,
          SelectableCountryOnSearchService,
          FormBuilder,
          SavedProfessionalApiService,
          { provide: StorageManagerService, useClass: StorageManagerMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(AboutEditComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
