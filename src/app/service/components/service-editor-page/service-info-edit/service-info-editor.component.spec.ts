import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceEditorDepsService } from '@app/service/components/service-editor-page/service-editor-deps.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ServiceInfoEditorComponent } from './service-info-editor.component';

describe('ServiceInfoEditComponent', () => {
  let component: ServiceInfoEditorComponent;
  let fixture: ComponentFixture<ServiceInfoEditorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ServiceInfoEditorComponent],
        imports: [TranslateModule.forRoot(), IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
        providers: [ServiceEditorDepsService],
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceInfoEditorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
