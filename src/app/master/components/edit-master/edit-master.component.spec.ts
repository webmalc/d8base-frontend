import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {SubcategoriesApiService} from '../../../core/services/subcategories-api.service';
import {EditMasterFormService} from '../../forms/edit-master-form.service';
import { EditMasterComponent } from './edit-master.component';

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
