import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {MasterEducationEditPage} from './master-education-edit.page';

describe('MasterEducationEditPage', () => {
  let component: MasterEducationEditPage;
  let fixture: ComponentFixture<MasterEducationEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasterEducationEditPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MasterEducationEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
