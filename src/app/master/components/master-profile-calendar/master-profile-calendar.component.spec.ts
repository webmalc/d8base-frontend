import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {MasterProfileCalendarComponent} from './master-profile-calendar.component';

describe('MasterProfileCalendarComponent', () => {
  let component: MasterProfileCalendarComponent;
  let fixture: ComponentFixture<MasterProfileCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasterProfileCalendarComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MasterProfileCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
