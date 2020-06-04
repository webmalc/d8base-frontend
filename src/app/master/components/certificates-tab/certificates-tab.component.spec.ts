import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormBuilder} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {CertificatesApiService} from '../../services/certificates-api.service';
import { CertificatesTabComponent } from './certificates-tab.component';

describe('CertificatesTabComponent', () => {
  let component: CertificatesTabComponent;
  let fixture: ComponentFixture<CertificatesTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificatesTabComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
      providers: [FormBuilder, CertificatesApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(CertificatesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
