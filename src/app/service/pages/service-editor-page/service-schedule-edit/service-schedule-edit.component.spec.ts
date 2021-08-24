import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceEditorDepsService } from '@app/service/pages/service-editor-page/service-editor-deps.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ServiceScheduleEditComponent } from './service-schedule-edit.component';

describe('ServiceScheduleEditComponent', () => {
  let component: ServiceScheduleEditComponent;
  let fixture: ComponentFixture<ServiceScheduleEditComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ServiceScheduleEditComponent],
        imports: [TranslateModule.forRoot(), IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
        providers: [ServiceEditorDepsService],
      }).compileComponents();

      fixture = TestBed.createComponent(ServiceScheduleEditComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
