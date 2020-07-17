import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicePublishStepSixComponent } from './service-publish-step-six.component';

describe('ServicePublishStepSixComponent', () => {
  let component: ServicePublishStepSixComponent;
  let fixture: ComponentFixture<ServicePublishStepSixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePublishStepSixComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicePublishStepSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
