import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StorageManagerService } from '@app/core/services/storage-manager.service';
import { CalendarGeneratorFactoryService } from '@app/master/services/calendar-generator-factory.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { StorageManagerMock } from 'src/testing/mocks';
import { MasterProfileCalendarComponent } from './master-profile-calendar.component';

describe('MasterProfileCalendarComponent', () => {
  let component: MasterProfileCalendarComponent;
  let fixture: ComponentFixture<MasterProfileCalendarComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MasterProfileCalendarComponent],
        imports: [IonicModule, HttpClientTestingModule, TranslateModule.forRoot()],
        providers: [CalendarGeneratorFactoryService, { provide: StorageManagerService, useClass: StorageManagerMock }],
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
