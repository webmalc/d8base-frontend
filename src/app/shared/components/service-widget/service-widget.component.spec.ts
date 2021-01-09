import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Service } from '@app/service/models/service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ServiceWidgetComponent } from './service-widget.component';

describe('ServiceWidgetComponent', () => {
  let component: ServiceWidgetComponent;
  let fixture: ComponentFixture<ServiceWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceWidgetComponent],
      imports: [
        IonicModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceWidgetComponent);
    component = fixture.componentInstance;
    component.service = new Service();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
