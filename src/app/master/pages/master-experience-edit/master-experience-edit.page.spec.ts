import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {MasterExperienceEditPage} from './master-experience-edit.page';

describe('MasterExperienceEditPage', () => {
  let component: MasterExperienceEditPage;
  let fixture: ComponentFixture<MasterExperienceEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasterExperienceEditPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MasterExperienceEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
