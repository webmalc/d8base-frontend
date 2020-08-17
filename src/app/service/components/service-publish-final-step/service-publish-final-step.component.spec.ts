import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ServicePublishFinalStepComponent} from './service-publish-final-step.component';

describe('ServicePublishFinalStepComponent', () => {
  let component: ServicePublishFinalStepComponent;
  let fixture: ComponentFixture<ServicePublishFinalStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePublishFinalStepComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicePublishFinalStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
