import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {EducationEditComponent} from './education-edit.component';

describe('EducationEditComponent', () => {
  let component: EducationEditComponent;
  let fixture: ComponentFixture<EducationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EducationEditComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EducationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
