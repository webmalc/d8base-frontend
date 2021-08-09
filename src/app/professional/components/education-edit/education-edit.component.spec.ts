import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EducationEditComponent } from './education-edit.component';

describe('EducationEditComponent', () => {
  let component: EducationEditComponent;
  let fixture: ComponentFixture<EducationEditComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EducationEditComponent],
        imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
        providers: [FormBuilder],
      }).compileComponents();

      fixture = TestBed.createComponent(EducationEditComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
