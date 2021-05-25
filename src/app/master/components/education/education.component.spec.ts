import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Education } from '@app/master/models/education';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { plainToClass } from 'class-transformer';
import { EducationComponent } from './education.component';

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EducationComponent],
        imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(EducationComponent);
      component = fixture.componentInstance;
      component.education = plainToClass(Education, {
        id: 1,
        professional: 1,
        university: 'test',
        deegree: 'test',
        field_of_study: 'test',
        is_still_here: true,
        description: 'desc',
        start_date: '2010-01-01',
      });
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
