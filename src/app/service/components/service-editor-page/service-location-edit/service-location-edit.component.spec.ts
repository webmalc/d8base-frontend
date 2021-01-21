import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ServiceLocationEditComponent } from './service-location-edit.component';

describe('ServiceLocationEditComponent', () => {
  let component: ServiceLocationEditComponent;
  let fixture: ComponentFixture<ServiceLocationEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceLocationEditComponent ],
      imports: [
        TranslateModule.forRoot(),
        IonicModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceLocationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
