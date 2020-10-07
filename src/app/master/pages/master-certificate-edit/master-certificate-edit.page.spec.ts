import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {MasterCertificateEditPage} from './master-certificate-edit.page';

describe('MasterCertificateEditPage', () => {
  let component: MasterCertificateEditPage;
  let fixture: ComponentFixture<MasterCertificateEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasterCertificateEditPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MasterCertificateEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
