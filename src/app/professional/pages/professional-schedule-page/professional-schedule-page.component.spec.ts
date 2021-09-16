import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CalendarGeneratorFactoryService } from '@app/professional/services/calendar-generator-factory.service';
import { NgxsModule, State } from '@ngxs/store';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { ProfessionalSchedulePageComponent } from './professional-schedule-page.component';

@State({
  name: 'MockState',
  defaults: { professional: {} },
})
@Injectable()
class MockState {}

describe('MasterProfileCalendarComponent', () => {
  let component: ProfessionalSchedulePageComponent;
  let fixture: ComponentFixture<ProfessionalSchedulePageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProfessionalSchedulePageComponent],
        imports: [...RootModules(), ComponentTestingModule, NgxsModule.forRoot([MockState])],
        providers: [CalendarGeneratorFactoryService],
      }).compileComponents();

      fixture = TestBed.createComponent(ProfessionalSchedulePageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
