import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ExperienceEditComponent } from './experience-edit.component';

describe('ExperienceEditComponent', () => {
  let component: ExperienceEditComponent;
  let fixture: ComponentFixture<ExperienceEditComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ExperienceEditComponent],
        imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
        providers: [FormBuilder],
      }).compileComponents();

      fixture = TestBed.createComponent(ExperienceEditComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
