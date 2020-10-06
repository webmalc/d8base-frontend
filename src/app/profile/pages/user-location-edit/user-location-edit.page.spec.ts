import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {UserLocationEditPage} from './user-location-edit.page';

describe('UserLocationEditPage', () => {
  let component: UserLocationEditPage;
  let fixture: ComponentFixture<UserLocationEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserLocationEditPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserLocationEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
