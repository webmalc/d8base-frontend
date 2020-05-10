import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditMasterComponent } from './edit-master.component';
import {EditMasterFormService} from '../../forms/edit-master-form.service';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {SubcategoriesApiService} from '../../services/subcategories-api.service';

describe('EditMasterComponent', () => {
  let component: EditMasterComponent;
  let fixture: ComponentFixture<EditMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          ReactiveFormsModule,
          HttpClientTestingModule,
          RouterTestingModule,
          IonicModule
      ],
      declarations: [ EditMasterComponent ],
      providers: [
          EditMasterFormService,
          SubcategoriesApiService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should be some tests');
});
