import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {MasterProfileServicePresentationComponent} from './master-profile-service-presentation.component';

describe('MasterProfileServicePresentationComponent', () => {
  let component: MasterProfileServicePresentationComponent;
  let fixture: ComponentFixture<MasterProfileServicePresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasterProfileServicePresentationComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MasterProfileServicePresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
