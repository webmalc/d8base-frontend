import { TestBed } from '@angular/core/testing';
import { AppModule } from '@app/app.module';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { CalendarGeneratorService } from './calendar-generator.service';

describe('CalendarGeneratorService', () => {
  let service: CalendarGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...RootModules(), ComponentTestingModule, AppModule],
    });
    service = TestBed.inject(CalendarGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
