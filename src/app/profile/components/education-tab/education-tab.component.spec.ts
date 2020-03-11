import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EducationTabComponent } from './education-tab.component';

describe('EducationTabComponent', () => {
  let component: EducationTabComponent;
  let fixture: ComponentFixture<EducationTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationTabComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EducationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
