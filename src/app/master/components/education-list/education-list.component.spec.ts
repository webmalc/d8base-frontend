import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EducationListComponent } from './education-list.component';

describe('EducationListComponent', () => {
  let component: EducationListComponent;
  let fixture: ComponentFixture<EducationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EducationListComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
