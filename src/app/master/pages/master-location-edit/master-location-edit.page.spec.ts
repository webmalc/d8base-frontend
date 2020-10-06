import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {MasterLocationEditPage} from './master-location-edit.page';

describe('MasterLocationEditPage', () => {
  let component: MasterLocationEditPage;
  let fixture: ComponentFixture<MasterLocationEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasterLocationEditPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MasterLocationEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
