import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ServiceScheduleEditComponent } from './service-schedule-edit.component';

describe('ServiceScheduleEditComponent', () => {
  let component: ServiceScheduleEditComponent;
  let fixture: ComponentFixture<ServiceScheduleEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceScheduleEditComponent ],
      imports: [
        TranslateModule.forRoot(),
        IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceScheduleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
