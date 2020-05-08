import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MasterTabsPage } from './master-tabs.page';

describe('MasterTabsPage', () => {
  let component: MasterTabsPage;
  let fixture: ComponentFixture<MasterTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTabsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MasterTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
