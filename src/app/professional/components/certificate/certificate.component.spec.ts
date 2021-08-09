import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Certificate } from '@app/professional/models/certificate';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { plainToClass } from 'class-transformer';
import { CertificateComponent } from './certificate.component';

describe('CertificateComponent', () => {
  let component: CertificateComponent;
  let fixture: ComponentFixture<CertificateComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CertificateComponent],
        imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(CertificateComponent);
      component = fixture.componentInstance;
      component.certificate = plainToClass(Certificate, {
        name: 'test',
        id: 1,
        date: '123',
        photo: 'link.asdf',
        professional: 1,
        organization: 'test',
        certificate_id: '123',
        url: 'link.sdf',
        photo_thumbnail: 'link.sdfsdf',
      });
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
