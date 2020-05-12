import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MasterTabsPage } from './master-tabs.page';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';

describe('MasterTabsPage', () => {
  let component: MasterTabsPage;
  let fixture: ComponentFixture<MasterTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), RouterTestingModule, TranslateModule.forRoot()],
      declarations: [ MasterTabsPage ]
    }).compileComponents();

    fixture = TestBed.createComponent(MasterTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should be some tests');
});
