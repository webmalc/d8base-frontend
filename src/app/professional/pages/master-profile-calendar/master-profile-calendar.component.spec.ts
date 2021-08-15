import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CalendarGeneratorFactoryService } from '@app/professional/services/calendar-generator-factory.service';
import { NgxsModule, State } from '@ngxs/store';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { MasterProfileCalendarComponent } from './master-profile-calendar.component';

@State({
  name: 'MockState',
  defaults: { professional: {} },
})
@Injectable()
class MockState {}

describe('MasterProfileCalendarComponent', () => {
  let component: MasterProfileCalendarComponent;
  let fixture: ComponentFixture<MasterProfileCalendarComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MasterProfileCalendarComponent],
        imports: [...RootModules(), ComponentTestingModule, NgxsModule.forRoot([MockState])],
        providers: [CalendarGeneratorFactoryService],
      }).compileComponents();

      fixture = TestBed.createComponent(MasterProfileCalendarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
