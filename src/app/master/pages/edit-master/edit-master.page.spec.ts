import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditMasterPage } from './edit-master.page';

describe('EditMasterPage', () => {
  let component: EditMasterPage;
  let fixture: ComponentFixture<EditMasterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMasterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
