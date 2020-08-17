import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimetableAddTimePopoverComponent } from './timetable-add-time-popover.component';

describe('TimetableAddTimePopoverComponent', () => {
  let component: TimetableAddTimePopoverComponent;
  let fixture: ComponentFixture<TimetableAddTimePopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimetableAddTimePopoverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimetableAddTimePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
