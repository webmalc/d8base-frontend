import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EducationTabComponent } from './education-tab.component';
import {EducationFormService} from '../../forms/education-form.service';
import {ReactiveFormsModule} from '@angular/forms';
import {EducationApiService} from '../../services/education-api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CertificateApiService} from '../../services/certificate-api.service';

describe('EducationTabComponent', () => {
  let component: EducationTabComponent;
  let fixture: ComponentFixture<EducationTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationTabComponent ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, HttpClientTestingModule],
      providers: [
          EducationFormService,
          EducationApiService,
          CertificateApiService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EducationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should be some tests');
});
