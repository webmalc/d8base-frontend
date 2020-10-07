import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {MasterTagEditPage} from './master-tag-edit.page';

describe('MasterTagEditPage', () => {
  let component: MasterTagEditPage;
  let fixture: ComponentFixture<MasterTagEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasterTagEditPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MasterTagEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
