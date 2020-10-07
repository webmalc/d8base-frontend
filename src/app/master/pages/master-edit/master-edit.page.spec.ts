import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {MasterEditPage} from './master-edit.page';

describe('MasterEditPage', () => {
  let component: MasterEditPage;
  let fixture: ComponentFixture<MasterEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasterEditPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MasterEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
