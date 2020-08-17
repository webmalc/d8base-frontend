import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicePublishStepSevenComponent } from './service-publish-step-seven.component';

describe('ServicePublishStepSevenComponent', () => {
  let component: ServicePublishStepSevenComponent;
  let fixture: ComponentFixture<ServicePublishStepSevenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePublishStepSevenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicePublishStepSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
