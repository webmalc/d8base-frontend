import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ServiceInfoEditComponent } from './service-info-edit.component';

describe('ServiceInfoEditComponent', () => {
  let component: ServiceInfoEditComponent;
  let fixture: ComponentFixture<ServiceInfoEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceInfoEditComponent ],
      imports: [
        TranslateModule.forRoot(),
        IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
