import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceEditorDepsService } from '@app/service/pages/service-editor-page/service-editor-deps.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ServiceTypeEditComponent } from './service-type-edit.component';

describe('ServiceLocationEditComponent', () => {
  let component: ServiceTypeEditComponent;
  let fixture: ComponentFixture<ServiceTypeEditComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ServiceTypeEditComponent],
        imports: [TranslateModule.forRoot(), IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
        providers: [ServiceEditorDepsService],
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceTypeEditComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
