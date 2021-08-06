import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { StorageManagerMock } from 'src/testing/mocks';
import { StorageManagerService } from '../core/services/storage-manager.service';
import { ProfessionalPageComponent } from './professional-page.component';

describe('MasterPage', () => {
  let component: ProfessionalPageComponent;
  let fixture: ComponentFixture<ProfessionalPageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule, TranslateModule.forRoot()],
        declarations: [ProfessionalPageComponent],
        providers: [{ provide: StorageManagerService, useClass: StorageManagerMock }],
      }).compileComponents();

      fixture = TestBed.createComponent(ProfessionalPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should be some tests');
});
