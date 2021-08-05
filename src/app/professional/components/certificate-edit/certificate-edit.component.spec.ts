import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CertificateEditComponent } from './certificate-edit.component';

describe('CertificateEditComponent', () => {
  let component: CertificateEditComponent;
  let fixture: ComponentFixture<CertificateEditComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CertificateEditComponent],
        imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
        providers: [FormBuilder],
      }).compileComponents();

      fixture = TestBed.createComponent(CertificateEditComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
