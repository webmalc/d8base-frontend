import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceEditorDepsService } from '@app/service/pages/service-editor-page/service-editor-deps.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ServiceEssentialsEditorComponent } from './service-essentials-editor.component';

describe('ServiceInfoEditComponent', () => {
  let component: ServiceEssentialsEditorComponent;
  let fixture: ComponentFixture<ServiceEssentialsEditorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ServiceEssentialsEditorComponent],
        imports: [TranslateModule.forRoot(), IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
        providers: [ServiceEditorDepsService],
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceEssentialsEditorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
