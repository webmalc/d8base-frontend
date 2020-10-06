import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {MasterProfileInfoComponent} from './master-profile-info.component';

describe('MasterProfileInfoComponent', () => {
  let component: MasterProfileInfoComponent;
  let fixture: ComponentFixture<MasterProfileInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasterProfileInfoComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MasterProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
